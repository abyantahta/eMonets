package emonets.backend.controllers;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import emonets.backend.dto.RegisterData;
import emonets.backend.dto.ResponseData;
import emonets.backend.services.RegistrationService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class RegistrationController {
    
    private final RegistrationService registrationService;

    @PostMapping("/register")
    public ResponseEntity<ResponseData<?>> register(@Valid @RequestBody RegisterData registerData, Errors errors){
        ResponseData<?> responseData = new ResponseData<>();

        //cek error validasi
        if(errors.hasErrors()){
            //mendapatkan semua error
            for (ObjectError error : errors.getAllErrors()) {
                responseData.getMessages().add(error.getDefaultMessage());
            }
            //melengkapi responseData
            responseData.setStatus(false);
            responseData.setPayload(null);
            //return
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseData);
        }
        else{
            responseData = registrationService.register(registerData);
            return ResponseEntity.ok().body(responseData);
        }
    }

    @GetMapping("/confirm")
    public String confirm(@RequestParam("token") String token){
        return registrationService.confirmToken(token);
    }

}
