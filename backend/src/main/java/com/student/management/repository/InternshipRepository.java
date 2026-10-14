package com.student.management.repository;

import com.student.management.entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InternshipRepository extends JpaRepository<Internship, Long> {
    List<Internship> findByStudentId(Long studentId);
    List<Internship> findByStatusIgnoreCase(String status);
    long countByStatusIgnoreCase(String status);
}
