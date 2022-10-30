package emonets.backend.services;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import emonets.backend.dto.RegisterTokenData;
import emonets.backend.models.AppUser;
import emonets.backend.models.AppUserRepo;
import emonets.backend.models.ConfirmationToken;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class AppUserService implements UserDetailsService{

    private final AppUserRepo appUserRepo;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepo.findByEmail(email).orElseThrow(()-> new UsernameNotFoundException("user tidak ditemukan"));
    }

    public RegisterTokenData signUpUser(AppUser user) {
        RegisterTokenData registerTokenData = new RegisterTokenData();

        //cek ada tidaknya user tersebut di database
        if(appUserRepo.findByEmail(user.getName()).isPresent()){
            log.info("cek jalur user exist");
            registerTokenData.setToken(null);
            registerTokenData.setUserExist(true);
        }
        else{
            log.info("cek jalur user not exist");
            //enkripsi password
            String encodedPassword = bCryptPasswordEncoder.encode(user.getPassword());

            //merubah password menjadi password terenkripsi
            user.setPassword(encodedPassword);

            //menyimpan user ke database
            appUserRepo.save(user);

            //membuat string random token
            String token = UUID.randomUUID().toString();

            //membuat objek confirmation token
            ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                user
            );

            //menyimpan confirmation token ke database
            confirmationTokenService.saveConfirmationToken(confirmationToken);

            //melengkapi registerTokenData
            registerTokenData.setUserExist(false);
            registerTokenData.setToken(token);
        }
        return registerTokenData;
    }

    public int enableAppUser(String email){
        return appUserRepo.enableAppUser(email);
    }

    public AppUser findAppUserByEmail(String email){
        return appUserRepo.findByEmail(email).get();
    }
}