package com.pasifcode.caxias_diary.service;

import com.pasifcode.caxias_diary.domain.dto.ProjectPostDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProjectPostService {
    Page<ProjectPostDto> search(Long projectId, Long postId, Pageable pageable);
}
