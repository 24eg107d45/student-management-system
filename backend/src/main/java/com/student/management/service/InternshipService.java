package com.student.management.service;

import com.student.management.entity.Internship;
import com.student.management.entity.Student;
import com.student.management.exception.ResourceNotFoundException;
import com.student.management.repository.InternshipRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InternshipService {

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private StudentService studentService;

    public List<Internship> getAllInternships() {
        return internshipRepository.findAll();
    }

    public List<Internship> getInternshipsByStudentId(Long studentId) {
        return internshipRepository.findByStudentId(studentId);
    }

    public Internship getInternshipById(Long id) {
        return internshipRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found with id: " + id));
    }

    public Internship addInternship(Long studentId, Internship internship) {
        Student student = studentService.getStudentById(studentId);
        internship.setStudent(student);
        return internshipRepository.save(internship);
    }

    public Internship updateInternship(Long id, Internship details) {
        Internship existing = getInternshipById(id);
        existing.setCompanyName(details.getCompanyName());
        existing.setRole(details.getRole());
        existing.setStartDate(details.getStartDate());
        existing.setEndDate(details.getEndDate());
        existing.setStatus(details.getStatus());
        existing.setStipend(details.getStipend());
        existing.setMode(details.getMode());
        existing.setSupervisor(details.getSupervisor());
        return internshipRepository.save(existing);
    }

    public void deleteInternship(Long id) {
        Internship internship = getInternshipById(id);
        internshipRepository.delete(internship);
    }
}
