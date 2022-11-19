package emonets.backend.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import emonets.backend.dto.AppUserData;
import emonets.backend.dto.ResponseData;
import emonets.backend.models.AppUser;
import emonets.backend.services.AppUserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
@CrossOrigin
@Slf4j
public class AppUserController {
    
    private final AppUserService appUserService;

    @GetMapping
    public ResponseEntity<ResponseData<AppUserData>> getUser(HttpServletRequest request){
        log.info("lewat sini");
        try {
            String authorizationHeader = request.getHeader(org.springframework.http.HttpHeaders.AUTHORIZATION);
            String token = authorizationHeader.substring("Bearer ".length());
            Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decodedJWT = verifier.verify(token);
            String email = decodedJWT.getSubject();
            AppUser appUser = appUserService.findAppUserByEmail(email);

            //menyiapkan DTO sebagai data yang dikembalikan ke frontend
            AppUserData appUserData = new AppUserData();
            appUserData.setEmail(appUser.getEmail());
            appUserData.setUsername(appUser.getName());
    
            ResponseData<AppUserData> responseData = new ResponseData<>();
            responseData.setStatus(true);
            responseData.getMessages().add("user didapatkan");
            responseData.setPayload(appUserData);
    
            return ResponseEntity.ok().body(responseData);
        } catch (Exception e) {
            ResponseData<AppUserData> responseData = new ResponseData<>();
            responseData.setStatus(false);
            responseData.getMessages().add(e.getMessage());
            responseData.setPayload(null);

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseData);
        }

    }
}
