package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.ImageDto;
import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.entity.Image;
import com.pasifcode.caxias_diary.domain.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface ImageService {

    List<Image> searchImages();

    Image saveImage(MultipartFile file, String title) throws IOException;

    Optional<Image> getImage(Long id);

    Image saveByProject(MultipartFile file, String title, Project project)throws IOException;
}
