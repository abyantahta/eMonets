package emonets.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterTokenData {
    private boolean userExist;
    private String token;
}
