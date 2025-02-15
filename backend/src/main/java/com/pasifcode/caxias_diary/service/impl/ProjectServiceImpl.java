package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.dto.ProjectDto;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.domain.repository.*;
import com.pasifcode.caxias_diary.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<ProjectDto> findAll(Pageable pageable) {
        Page<Project> page = projectRepository.findAll(pageable);

        return page.map(ProjectDto::new);
    }

    @Override
    public Page<ProjectDto> findByUser(User user, Pageable pageable) {
        Page<Project> find = projectRepository.findByUser(user, pageable);
        return find.map(ProjectDto::new);
    }


    @Override
    @Transactional(readOnly = true)
    public ProjectDto findProjectById(Long id) {
        Project find = projectRepository.findById(id).orElseThrow();
        return new ProjectDto(find);
    }

    @Override
    public ProjectDto saveProject(ProjectDto dto) {
        User user = userRepository.findById(dto.getUserId()).orElseThrow();

        Project add = new Project();
        add.setTitle(dto.getProjectTitle());
        add.setDescription(dto.getProjectDescription());
        add.setImage(dto.getProjectImage());
        add.setUser(user);

        return new ProjectDto(projectRepository.saveAndFlush(add));
    }

    @Override
    public ProjectDto updateProject(ProjectDto dto) {
        Project edit = projectRepository.findById(dto.getId()).orElseThrow();

        edit.setId(edit.getId());
        edit.setTitle(dto.getProjectTitle());
        edit.setDescription(dto.getProjectDescription());
        edit.setImage(dto.getProjectImage());
        return new ProjectDto(projectRepository.save(edit));
    }

    @Override
    public void deleteProject(Long id) {
        this.projectRepository.deleteById(id);
    }
}
