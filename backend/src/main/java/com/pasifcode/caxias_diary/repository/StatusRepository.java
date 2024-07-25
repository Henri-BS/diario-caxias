package com.pasifcode.caxias_diary.repository;

import com.pasifcode.caxias_diary.domain.entity.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {
    Status findByDescription(String description);

}
