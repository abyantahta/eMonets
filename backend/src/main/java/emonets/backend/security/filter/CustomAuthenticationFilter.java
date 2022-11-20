package emonets.backend.security.filter;

import java.io.IOException;
import java.util.Date;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.fasterxml.jackson.databind.ObjectMapper;

import emonets.backend.dto.JsonWebToken;
import emonets.backend.dto.ResponseData;
import emonets.backend.models.AppUser;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@AllArgsConstructor
@Slf4j
@CrossOrigin
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
    private final AuthenticationManager authenticationManager;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {

        log.info("unsuccessfull authentication");
        ResponseData<?> res = new ResponseData<>();
        res.setStatus(false);
        res.getMessages().add("email atau password salah");
        res.setPayload(null);
        response.setStatus(org.springframework.http.HttpStatus.FORBIDDEN.value());
        new ObjectMapper().writeValue(response.getOutputStream(), res);

    }

    /* (non-Javadoc)
     * @see org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter#successfulAuthentication(javax.servlet.http.HttpServletRequest, javax.servlet.http.HttpServletResponse, javax.servlet.FilterChain, org.springframework.security.core.Authentication)
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authentication) throws IOException, ServletException {
        log.info("successfull authentication");
        AppUser user = (AppUser)authentication.getPrincipal();
        //membuat token
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        String access_token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+ 2*60*60*1000))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
        String refresh_token = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+ 120*60*60*1000))
                .withIssuer(request.getRequestURL().toString())
                .sign(algorithm);

        // mengenkapsulasi token dalam class JsonWebtoken
        JsonWebToken token = new JsonWebToken();
        token.setAccess_token(access_token);
        token.setRefresh_token(refresh_token);

        // mengenkapsulasi response menggunakan ResponseData
        ResponseData<JsonWebToken> res = new ResponseData<>();
        res.setStatus(true);
        res.getMessages().add("login berhasil");
        res.setPayload(token);

        response.setContentType(org.springframework.http.MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(org.springframework.http.HttpStatus.OK.value());
        new ObjectMapper().writeValue(response.getOutputStream(), res);
    }
}
