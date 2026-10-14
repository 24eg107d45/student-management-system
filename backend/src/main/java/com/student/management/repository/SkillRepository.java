package com.student.management.repository;

import com.student.management.entity.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
    List<Skill> findByStudentId(Long studentId);
    List<Skill> findByCategoryIgnoreCase(String category);
    long countByCategoryIgnoreCase(String category);
}
