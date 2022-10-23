package emonets.backend.services;


import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.stereotype.Service;

import emonets.backend.models.ConfirmationToken;
import emonets.backend.models.ConfirmationTokenRepo;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {
    
    private final ConfirmationTokenRepo confirmationTokenRepo;

    public void saveConfirmationToken(ConfirmationToken token){
        confirmationTokenRepo.save(token);
    }

    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepo.findByToken(token);
    }

    public int setConfirmedAt(String token){
        return confirmationTokenRepo.updateConfirmedAt(token, LocalDateTime.now());
    }
}
