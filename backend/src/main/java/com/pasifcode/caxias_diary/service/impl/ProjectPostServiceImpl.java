package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.dto.ProjectPostDto;
import com.pasifcode.caxias_diary.domain.entity.ProjectPost;
import com.pasifcode.caxias_diary.domain.repository.ProjectPostRepository;
import com.pasifcode.caxias_diary.service.ProjectPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectPostServiceImpl implements ProjectPostService {

    @Autowired
    private ProjectPostRepository projectPostRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<ProjectPostDto> search(Long projectId, Long postId, Pageable pageable) {
        Specification<ProjectPost> spec = Specification.where(null);

        if (projectId != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("project").get("id"), projectId));
        }

        if (postId != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("post").get("id"), postId));
        }

        return projectPostRepository.findAll(spec, pageable).map(ProjectPostDto::new);
    }
}
