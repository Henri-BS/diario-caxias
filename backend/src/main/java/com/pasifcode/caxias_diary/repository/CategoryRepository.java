package com.pasifcode.caxias_diary.repository;

import com.pasifcode.caxias_diary.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{

    @Query("SELECT obj FROM Category obj WHERE UPPER(obj.name)" +
            " LIKE UPPER(CONCAT('%', ?1, '%')) ORDER BY obj.name")
    Page<Category> findAllPostCategories(String name, Pageable pageable);
}