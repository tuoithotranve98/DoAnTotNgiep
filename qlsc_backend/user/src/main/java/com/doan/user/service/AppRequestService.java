package com.doan.user.service;

import org.springframework.http.ResponseEntity;

public interface AppRequestService {

    ResponseEntity<String> get(String uri, String accessToken);

    ResponseEntity<String> post(
        String uri,
        String accessToken,
        String body
    );
}
