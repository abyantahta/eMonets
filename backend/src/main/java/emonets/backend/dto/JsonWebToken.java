package emonets.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JsonWebToken {
    private String access_token;
    private String refresh_token;
}
