package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.dto.ProjectPostDto;
import com.pasifcode.caxias_diary.domain.entity.Post;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.ProjectPost;
import com.pasifcode.caxias_diary.domain.repository.ProjectPostRepository;
import com.pasifcode.caxias_diary.service.ProjectPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectPostServiceImpl implements ProjectPostService {

    @Autowired
    private ProjectPostRepository projectPostRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<ProjectPostDto> findByPost(Post post, Pageable pageable) {
        Page<ProjectPost> list = projectPostRepository.findByPost(post, pageable);
        return list.map(ProjectPostDto::new);
    }

    @Override
    public Page<ProjectPostDto> findByProject(Project project, Pageable pageable) {
        Page<ProjectPost> list = projectPostRepository.findByProject(project, pageable);
        return list.map(ProjectPostDto::new);
    }
}
