package com.pasifcode.caxias_diary.domain.repository;

import com.pasifcode.caxias_diary.domain.entity.ItemDetails;
import com.pasifcode.caxias_diary.domain.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemDetailsRepository extends JpaRepository<ItemDetails, Long> {
    List<ItemDetails> findByProject(Project project);
}
