package emonets.backend.security.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;

import emonets.backend.dto.ResponseData;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomAuthorizationFilter extends OncePerRequestFilter{

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if(
            request.getServletPath().equals("/api/login") || 
            request.getServletPath().equals("/api/token/refresh")
        ){
            filterChain.doFilter(request, response);
        }
        else{
            String authorizationHeader = request.getHeader(org.springframework.http.HttpHeaders.AUTHORIZATION);
            log.info("headerAuth "+authorizationHeader);
            
            if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
                try {
                    log.info("jalur1");
                    String token = authorizationHeader.substring("Bearer ".length());
                    Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);
                    String username = decodedJWT.getSubject();
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    java.util.Arrays.stream(roles).forEach(role -> {
                        authorities.add(new SimpleGrantedAuthority(role));
                    });
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    filterChain.doFilter(request, response);
                } catch (Exception e) {
                    log.info("jalur2");
                    response.setHeader("error", e.getMessage());
                    response.setStatus(org.springframework.http.HttpStatus.FORBIDDEN.value());
                    // mengenkapsulasi response menggunakan ResponseData
                    ResponseData<?> res = new ResponseData<>();
                    res.setStatus(false);
                    res.getMessages().add("akses "+e.getMessage());
                    res.setPayload(null);
                    new ObjectMapper().writeValue(response.getOutputStream(), res);
                }
            }
            else{
                filterChain.doFilter(request, response);
            }
        }
        
    }
    
}
