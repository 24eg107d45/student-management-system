package com.student.management.repository;

import com.student.management.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByRollNumber(String rollNumber);
    Optional<Student> findByEmail(String email);
    List<Student> findByDepartmentIgnoreCase(String department);
    List<Student> findByNameContainingIgnoreCaseOrRollNumberContainingIgnoreCase(String name, String rollNumber);
}
