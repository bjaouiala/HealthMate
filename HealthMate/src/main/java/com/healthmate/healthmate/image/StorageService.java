package com.healthmate.healthmate.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class StorageService {
    @Autowired
    private ImageRepository imageRepository;

    public String uploadImage(MultipartFile file) throws IOException {
        imageRepository.save(Image.builder()
                .filename(file.getOriginalFilename())
                .type(file.getContentType())
                .data(file.getBytes()).build());
        return "file uploaded";
    }
}
