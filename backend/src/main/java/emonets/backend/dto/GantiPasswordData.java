package emonets.backend.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GantiPasswordData {
    @NotEmpty(message = "email diperlukan")
    @Email(message = "format masukan salah")
    private String email;
}
