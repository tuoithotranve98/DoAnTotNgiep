package com.doan.image.controller;

import com.doan.image.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@RestController
@RequestMapping("admin")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ImageController {

    private final StorageService storageService;
    private static final String BASE_URL = "http://localhost:8762/api/image/admin/image/";

    @PostMapping("/uploadFile")
    public String uploadFile(@RequestParam("file") MultipartFile file) {
        String type = file.getContentType();
        if (type != null && type.equals("image/png") || Objects.equals(type, "image/jpeg")) {
            storageService.store(file);
            return StringUtils.cleanPath(BASE_URL+file.getOriginalFilename());
        } else {
            return "File không hợp lệ!";
        }
    }

    @GetMapping(path = "/image/{filename:.+}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public Resource serveFile(@PathVariable String filename) {
        return storageService.loadAsResource(filename);
    }

    @GetMapping("test")
    public String testApi() {
        return "Success";
    }
}
