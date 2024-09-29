package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.entity.Image;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.enums.ImageExtension;
import com.pasifcode.caxias_diary.domain.repository.ImageRepository;
import com.pasifcode.caxias_diary.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ImageServiceImpl implements ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Override
    @Transactional(readOnly=true)
    public List<Image> searchImages(){
         return imageRepository.findAll();
    }

    @Override
    public Optional<Image> getImage(Long id) {
        return imageRepository.findById(id);
    }


    @Override
    public Image saveImage(MultipartFile file, String title) throws IOException {
        Image add = new Image();
        add.setTitle(title);
        add.setFile(file.getBytes());
        add.setExtension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())));
        add.setSize(file.getSize());
        return imageRepository.save(add);
    }


    @Override
    public Image saveByProject(MultipartFile file, String title, Project project) throws IOException {
        Image add = new Image();
        add.setTitle(title);
        add.setFile(file.getBytes());
        add.setExtension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())));
        add.setSize(file.getSize());
        add.setProject(project);
        return imageRepository.save(add);
    }
}
