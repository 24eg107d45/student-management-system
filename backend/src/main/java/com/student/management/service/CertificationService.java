package com.student.management.service;

import com.student.management.entity.Certification;
import com.student.management.entity.Student;
import com.student.management.exception.ResourceNotFoundException;
import com.student.management.repository.CertificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificationService {

    @Autowired
    private CertificationRepository certificationRepository;

    @Autowired
    private StudentService studentService;

    public List<Certification> getCertificationsByStudentId(Long studentId) {
        return certificationRepository.findByStudentId(studentId);
    }

    public Certification addCertification(Long studentId, Certification cert) {
        Student student = studentService.getStudentById(studentId);
        cert.setStudent(student);
        return certificationRepository.save(cert);
    }

    public void deleteCertification(Long id) {
        Certification cert = certificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certification not found with id: " + id));
        certificationRepository.delete(cert);
    }
}
