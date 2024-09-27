package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.ImageDto;
import com.pasifcode.caxias_diary.domain.entity.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

public interface ImageService {

    Page<ImageDto> searchImages(Pageable pageable);

    Image saveImage(MultipartFile file, String title) throws IOException;

    Optional<Image> getImage(Long id);
}
