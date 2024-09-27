package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.ImageDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {

    Page<ImageDto> searchImages(Pageable pageable);

    ImageDto saveImage(MultipartFile file, String title) throws IOException;
}
