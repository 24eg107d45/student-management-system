package com.student.management.controller;

import com.student.management.entity.Certification;
import com.student.management.service.CertificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin(origins = "*")
public class CertificationController {

    @Autowired
    private CertificationService certificationService;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Certification>> getCertificationsByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(certificationService.getCertificationsByStudentId(studentId));
    }

    @PostMapping("/student/{studentId}")
    public ResponseEntity<Certification> addCertification(@PathVariable Long studentId, @RequestBody Certification cert) {
        return new ResponseEntity<>(certificationService.addCertification(studentId, cert), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {
        certificationService.deleteCertification(id);
        return ResponseEntity.noContent().build();
    }
}
