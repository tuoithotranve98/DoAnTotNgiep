package com.doan.image.controller;

import com.doan.image.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class UserController {

    private StorageService storageService;

    @Autowired
    public UserController(StorageService storageService) {
        this.storageService = storageService;
    }

    @GetMapping(path = "/image/{filename:.+}", produces = {MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
    public Resource serveFile(@PathVariable String filename) {
        Resource file = storageService.loadAsResource(filename);
        return file;
    }

}
