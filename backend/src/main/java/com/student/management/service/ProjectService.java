package com.student.management.service;

import com.student.management.entity.Project;
import com.student.management.entity.Student;
import com.student.management.exception.ResourceNotFoundException;
import com.student.management.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private StudentService studentService;

    public List<Project> getProjectsByStudentId(Long studentId) {
        return projectRepository.findByStudentId(studentId);
    }

    public Project addProject(Long studentId, Project project) {
        Student student = studentService.getStudentById(studentId);
        project.setStudent(student);
        return projectRepository.save(project);
    }

    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
        projectRepository.delete(project);
    }
}
