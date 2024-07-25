package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.dto.ProjectDto;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.repository.ProjectRepository;
import com.pasifcode.caxias_diary.repository.UserRepository;
import com.pasifcode.caxias_diary.service.interf.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<ProjectDto> findAllPosts(String title, Pageable pageable) {
        Page<Project> find = projectRepository.findAllPosts(title, pageable);
        return find.map(ProjectDto::new);
    }


    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> findByUser(User user) {
        List<Project> list = projectRepository.findByUser(user);
        return list.stream().map(ProjectDto::new).toList();
    }


    @Override
    @Transactional(readOnly = true)
    public ProjectDto findPostById(Long id) {
        Project find = projectRepository.findById(id).orElseThrow();
        return new ProjectDto(find);
    }

    @Override
    public ProjectDto savePost(ProjectDto dto) {
        User user = userRepository.findById(dto.getUserId()).orElseThrow();

        Project add = new Project();
        add.setTitle(dto.getTitle());
        add.setBody(dto.getBody());
        add.setImage(dto.getImage());
        add.setUser(user);
        return new ProjectDto(projectRepository.saveAndFlush(add));
    }

    @Override
    public ProjectDto updatePost(ProjectDto dto) {
        Project edit = projectRepository.findById(dto.getId()).orElseThrow();

        edit.setId(edit.getId());
        edit.setTitle(dto.getTitle());
        edit.setImage(dto.getImage());
        edit.setBody(dto.getBody());
        return new ProjectDto(projectRepository.save(edit));
    }

    @Override
    public void deletePost(Long id) {
        this.projectRepository.deleteById(id);
    }
}
