package com.pasifcode.caxias_diary.domain.repository;

import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.entity.Project;
import com.pasifcode.caxias_diary.domain.entity.ProjectCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProejectCategoryRepository extends JpaRepository<ProjectCategory, Long> {

    Page<ProjectCategory> findByProject(Project project, Pageable pageable);

    Page<ProjectCategory> findByCategory(Category category, Pageable pageable);

}
