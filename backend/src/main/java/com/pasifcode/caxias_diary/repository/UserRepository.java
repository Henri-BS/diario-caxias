package com.pasifcode.caxias_diary.repository;

import com.pasifcode.caxias_diary.domain.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    User findByEmail(String email);

    @Query("""
            SELECT obj FROM User obj
            WHERE UPPER(obj.firstName) LIKE UPPER(CONCAT('%', ?1, '%'))
            OR UPPER(obj.lastName) LIKE UPPER(CONCAT('%', ?2, '%'))
            ORDER BY obj.firstName
            """)
    Page<User> findAll(String firstName, String lastName, Pageable pageable);
}