package com.doan.image.security;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class JwtTokenAuthenticationFilter extends  OncePerRequestFilter {
    
	private final JwtConfig jwtConfig;
	
	public JwtTokenAuthenticationFilter(JwtConfig jwtConfig) {
		this.jwtConfig = jwtConfig;
	}
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		
		String header = request.getHeader(jwtConfig.getHeader());
		System.out.println(header);
		if(header == null || !header.startsWith(jwtConfig.getPrefix())) {
			chain.doFilter(request, response);  		
			return;
		}
		
		String token = header.replace(jwtConfig.getPrefix(), "");
		
		try {	
			Claims claims = Jwts.parser()
					.setSigningKey(jwtConfig.getSecret().getBytes())
					.parseClaimsJws(token)
					.getBody();
			System.out.println(claims.toString());
			Long now = System.currentTimeMillis();
			Date date = new Date(now);
			Date exp = claims.getExpiration();
			System.out.println(exp);
			if(date.compareTo(exp) > 0) {
				return;
			}
			String username = claims.getSubject();
			if(username != null) {
				@SuppressWarnings("unchecked")
				List<String> authorities = (List<String>) claims.get("authorities");
				 UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(
								 username, null, authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));

				 SecurityContextHolder.getContext().setAuthentication(auth);
			}
			
		} catch (Exception e) {
			System.out.println("asd");
		
			SecurityContextHolder.clearContext();
		}
		chain.doFilter(request, response);
	}

}
