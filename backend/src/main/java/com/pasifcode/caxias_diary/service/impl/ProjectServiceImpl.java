package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.entity.Event;
import com.pasifcode.caxias_diary.domain.dto.ProjectDto;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.domain.enums.ImageExtension;
import com.pasifcode.caxias_diary.domain.repository.*;
import com.pasifcode.caxias_diary.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    private void projectValues(Project project) {
        Project add = projectRepository.findById(project.getId()).orElseThrow();
        List<Event> event = eventRepository.findByProject(add);
        for (Event e : event) {
            add.setCountEvents(add.getEvents().size());
            projectRepository.save(add);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Project> findAllProjects(Pageable pageable) {
        Page<Project> list = projectRepository.findAll(pageable);
        for (Project project : list) {
            projectValues(project);
        }
        return list;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProjectDto> findByUser(User user) {
        List<Project> list = projectRepository.findByUser(user);
        return list.stream().map(ProjectDto::new).toList();
    }


    @Override
    @Transactional(readOnly = true)
    public ProjectDto findProjectById(Long id) {
        Project find = projectRepository.findById(id).orElseThrow();
        return new ProjectDto(find);
    }

    @Override
    public Optional<Project> getProjectImage(Long id) {
        return projectRepository.findById(id);
    }

    @Override
    public ProjectDto saveProject(ProjectDto dto) {
        User user = userRepository.findById(dto.getUserId()).orElseThrow();

        Project add = new Project();
        add.setTitle(dto.getTitle());
        add.setBody(dto.getBody());
        add.setUser(user);
        projectRepository.saveAndFlush(add);
        projectValues(add);

        return new ProjectDto(add);
    }

    @Override
    public ProjectDto updateProject(ProjectDto dto) {
        Project edit = projectRepository.findById(dto.getId()).orElseThrow();

        edit.setId(edit.getId());
        edit.setTitle(dto.getTitle());
        edit.setBody(dto.getBody());
        return new ProjectDto(projectRepository.save(edit));
    }

    @Override
    public Project saveProjectImage(MultipartFile file, Long id) throws IOException {
        Project project = projectRepository.findById(id).orElseThrow();

        project.setImage(file.getBytes());
        project.setExtension(ImageExtension.valueOf(MediaType.valueOf(file.getContentType())));
        return projectRepository.save(project);
    }

    @Override
    public void deleteProject(Long id) {
        this.projectRepository.deleteById(id);
    }
}
