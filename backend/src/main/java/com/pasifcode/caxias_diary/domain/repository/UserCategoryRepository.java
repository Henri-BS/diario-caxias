package com.pasifcode.caxias_diary.domain.repository;

import com.pasifcode.caxias_diary.domain.entity.Category;
import com.pasifcode.caxias_diary.domain.entity.User;
import com.pasifcode.caxias_diary.domain.entity.UserCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserCategoryRepository extends JpaRepository<UserCategory, Long> {
    Page<UserCategory> findByCategory(Category category, Pageable pageable);

    Page<UserCategory> findByUser(User user, Pageable pageable);

    Page<UserCategory> findAll(Specification<UserCategory> spec, Pageable pageable);
}