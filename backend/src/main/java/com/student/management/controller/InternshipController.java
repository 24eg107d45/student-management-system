package com.student.management.controller;

import com.student.management.entity.Internship;
import com.student.management.service.InternshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/internships")
@CrossOrigin(origins = "*")
public class InternshipController {

    @Autowired
    private InternshipService internshipService;

    @GetMapping
    public ResponseEntity<List<Internship>> getAllInternships() {
        return ResponseEntity.ok(internshipService.getAllInternships());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Internship>> getInternshipsByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(internshipService.getInternshipsByStudentId(studentId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Internship> getInternshipById(@PathVariable Long id) {
        return ResponseEntity.ok(internshipService.getInternshipById(id));
    }

    @PostMapping("/student/{studentId}")
    public ResponseEntity<Internship> addInternship(@PathVariable Long studentId, @RequestBody Internship internship) {
        Internship created = internshipService.addInternship(studentId, internship);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Internship> updateInternship(@PathVariable Long id, @RequestBody Internship internship) {
        Internship updated = internshipService.updateInternship(id, internship);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInternship(@PathVariable Long id) {
        internshipService.deleteInternship(id);
        return ResponseEntity.noContent().build();
    }
}
