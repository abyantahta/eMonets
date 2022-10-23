package emonets.backend.controllers;

import java.io.IOException;
import java.util.Date;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.exc.StreamWriteException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

import emonets.backend.dto.JsonWebToken;
import emonets.backend.dto.RegisterData;
import emonets.backend.dto.ResponseData;
import emonets.backend.models.AppUser;
import emonets.backend.services.AppUserService;
import emonets.backend.services.RegistrationService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class RegistrationController {
    
    private final RegistrationService registrationService;
    private final AppUserService appUserService;

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

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws StreamWriteException, DatabindException, IOException{
        String authorizationHeader = request.getHeader(org.springframework.http.HttpHeaders.AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            try {
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                AppUser user = appUserService.findAppUserByEmail(username);

                String access_token = JWT.create()
                    .withSubject(user.getUsername())
                    .withExpiresAt(new Date(System.currentTimeMillis()+ 1*60*1000))
                    .withIssuer(request.getRequestURL().toString())
                    .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                    .sign(algorithm);
                
                    // mengenkapsulasi token dalam class JsonWebtoken
                    JsonWebToken token = new JsonWebToken();
                    token.setAccess_token(access_token);
                    token.setRefresh_token(refresh_token);

                    // mengenkapsulasi response menggunakan ResponseData
                    ResponseData<JsonWebToken> res = new ResponseData<>();
                    res.setStatus(true);
                    res.getMessages().add("refresh token berhasil");
                    res.setPayload(token);

                    response.setContentType(org.springframework.http.MediaType.APPLICATION_JSON_VALUE);
                    new ObjectMapper().writeValue(response.getOutputStream(), res);
                

            } catch (Exception e) {
                response.setHeader("error", e.getMessage());
                response.setStatus(org.springframework.http.HttpStatus.FORBIDDEN.value());
                // response.sendError(org.springframework.http.HttpStatus.FORBIDDEN.value());
                // mengenkapsulasi response menggunakan ResponseData
                ResponseData<?> res = new ResponseData<>();
                res.setStatus(false);
                res.getMessages().add("refresh "+e.getMessage());
                res.setPayload(null);
                new ObjectMapper().writeValue(response.getOutputStream(), res);
            }
        }
        else{
            throw new RuntimeException("Refresh token is missing");
        }
    }

}
