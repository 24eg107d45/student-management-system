package com.student.management.controller;

import com.student.management.entity.Project;
import com.student.management.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Project>> getProjectsByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(projectService.getProjectsByStudentId(studentId));
    }

    @PostMapping("/student/{studentId}")
    public ResponseEntity<Project> addProject(@PathVariable Long studentId, @RequestBody Project project) {
        return new ResponseEntity<>(projectService.addProject(studentId, project), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
