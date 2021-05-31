package com.doan.maintenancecard.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@EnableWebSecurity
public class SecurityTokenConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtConfig jwtConfig;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .exceptionHandling().authenticationEntryPoint((req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED))
            .and()
            .addFilterAfter(new JwtTokenAuthenticationFilter(jwtConfig), UsernamePasswordAuthenticationFilter.class)
            .authorizeRequests()
            .antMatchers("/admin/**").hasAnyRole("2", "1", "3", "4")
            .antMatchers(HttpMethod.POST, "/admin/maintenanceCards/**").hasAnyRole("1", "3")
            .antMatchers(HttpMethod.DELETE, "/admin/maintenanceCards/deletes").hasAnyRole("1", "3")
            .antMatchers(HttpMethod.GET, "/admin/maintenanceCards/**").hasAnyRole("1", "2", "3")
            .antMatchers(HttpMethod.PUT, "/admin/maintenanceCards/workStatus/**").hasAnyRole("2")
            .antMatchers(HttpMethod.PUT, "/admin/maintenanceCardDetails/status").hasAnyRole("2")
            .antMatchers("/admin/paymentHistories/**").hasAnyRole("3")
            .anyRequest().permitAll();
    }

    @Bean
    public JwtConfig jwtConfig() {
        return new JwtConfig();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
