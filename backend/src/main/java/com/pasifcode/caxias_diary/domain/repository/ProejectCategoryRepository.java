package com.pasifcode.caxias_diary.domain.repository;


import com.pasifcode.caxias_diary.domain.entity.ProjectCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProejectCategoryRepository extends JpaRepository<ProjectCategory, Long> {

    Page<ProjectCategory> findAll(Specification<ProjectCategory> spec, Pageable pageable);

}
