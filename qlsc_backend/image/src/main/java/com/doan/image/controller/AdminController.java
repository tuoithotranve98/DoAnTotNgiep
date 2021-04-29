package com.doan.image.controller;

import javax.servlet.http.HttpServletResponse;

import com.doan.image.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    private StorageService storageService;

    @Autowired
    public AdminController(StorageService storageService) {
        this.storageService = storageService;
    }

    @PostMapping("/uploadFile")
    public String uploadFile(@RequestParam("file") MultipartFile file, HttpServletResponse response) {
        String type = file.getContentType();
        if (type.equals("image/png") || type.equals("image/jpeg")) {
            storageService.store(file);
            return StringUtils.cleanPath(file.getOriginalFilename());
        } else {
            return null;
        }
    }
}
