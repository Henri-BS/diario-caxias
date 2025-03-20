package com.pasifcode.caxias_diary.domain.repository;


import com.pasifcode.caxias_diary.domain.entity.ProjectCategory;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectCategoryRepository extends JpaRepository<ProjectCategory, Long> {

    List<ProjectCategory> findAll(Specification<ProjectCategory> spec);

}
