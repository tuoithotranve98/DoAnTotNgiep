package com.doan.user.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;

@Service
public class AppAuthHelper {

    private final JwtConfig jwtConfig;

    public AppAuthHelper(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
    }

    public AppCredential httpCredential() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (requestAttributes instanceof ServletRequestAttributes) {
            HttpServletRequest request = ((ServletRequestAttributes)requestAttributes).getRequest();
            String header = request.getHeader("X-APP-PAGE-TOKEN");
            String token = header.replace(jwtConfig.getPrefix(), "");
            Claims claims = Jwts.parser()
                .setSigningKey(jwtConfig.getSecret().getBytes())
                .parseClaimsJws(token)
                .getBody();
            AppCredential credential = new AppCredential();
            credential.setTenantId((String) claims.get("tenantId"));
            return credential;
        }

        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credential not found");
    }

    @Getter
    @Setter
    public static class AppCredential {
        private String tenantId;
    }
}
