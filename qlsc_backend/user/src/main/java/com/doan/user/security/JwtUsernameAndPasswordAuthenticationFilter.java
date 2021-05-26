package com.doan.user.security;

import com.doan.user.entity.User;
import com.doan.user.exception.commonException.NotFoundException;
import com.doan.user.repository.UserRepository;
import com.doan.user.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Getter;
import lombok.Setter;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.util.ObjectUtils;

import javax.security.auth.message.AuthException;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class JwtUsernameAndPasswordAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private AuthenticationManager authManager;
    private final JwtConfig jwtConfig;
    private final UserRepository userRepository;

    public JwtUsernameAndPasswordAuthenticationFilter(AuthenticationManager authManager, JwtConfig jwtConfig, UserRepository userRepository) {
        this.authManager = authManager;
        this.jwtConfig = jwtConfig;
        this.userRepository = userRepository;
        this.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher(jwtConfig.getUri(), "POST"));
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws RuntimeException {

        try {
            UserCredentials credential = new ObjectMapper().readValue(request.getInputStream(), UserCredentials.class);
            User user = userRepository.checkExistEmail(credential.getUsername());
            if (ObjectUtils.isEmpty(user.getTenant())) {
                throw new AuthException();
            }
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                credential.getUsername(), credential.getPassword(), Collections.emptyList());
            return authManager.authenticate(authToken);

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (AuthException e) {
            throw new AuthException("Tenant Not Found!");
        }
    }

    @Override
    protected void successfulAuthentication(
        HttpServletRequest request,
        HttpServletResponse response,
        FilterChain chain,
        Authentication auth) {
        Long now = System.currentTimeMillis();
        List<String> s = auth.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        String token = Jwts.builder()
            .setSubject(auth.getName())
            .claim("authorities", auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
            .setIssuedAt(new Date(now))
            .setExpiration(new Date(now + jwtConfig.getExpiration() * 100000))  // in milliseconds
            .signWith(SignatureAlgorithm.HS512, jwtConfig.getSecret().getBytes())
            .compact();
        response.addHeader(jwtConfig.getHeader(), jwtConfig.getPrefix() + " " + token);
        response.setStatus(200);
        response.addHeader("Access-Control-Expose-Headers", jwtConfig.getHeader());
        response.addHeader("roll", s.get(0));
    }

    @Getter
    @Setter
    private static class UserCredentials {
        private String username;
        private String password;
    }
}
