package com.doan.maintenancecard.service.impl;

import com.doan.maintenancecard.security.JwtConfig;
import com.doan.maintenancecard.service.AppRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AppRequestServiceImpl implements AppRequestService {

    private final RestTemplate restTemplate;

    @Override
    public ResponseEntity<String> get(String uri, String accessToken) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("X-APP-PAGE-TOKEN", accessToken);
            headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
            HttpEntity<String> entity = new HttpEntity<>(headers);
            // Encode URI
            UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(uri);
            String finalURI = URLDecoder.decode(builder.toUriString(), StandardCharsets.UTF_8);

            // Make request
            ResponseEntity<String> response = restTemplate.exchange(finalURI, HttpMethod.GET, entity, String.class);
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public ResponseEntity<String> post(String uri, String accessToken, String body) {
        return null;
    }
}
