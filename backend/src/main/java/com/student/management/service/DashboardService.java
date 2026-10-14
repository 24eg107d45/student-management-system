package com.student.management.service;

import com.student.management.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private InternshipRepository internshipRepository;

    @Autowired
    private CertificationRepository certificationRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalStudents", studentRepository.count());
        stats.put("totalSkills", skillRepository.count());
        stats.put("technicalSkills", skillRepository.countByCategoryIgnoreCase("Technical"));
        stats.put("softSkills", skillRepository.countByCategoryIgnoreCase("Soft"));
        stats.put("totalInternships", internshipRepository.count());
        stats.put("ongoingInternships", internshipRepository.countByStatusIgnoreCase("Ongoing"));
        stats.put("completedInternships", internshipRepository.countByStatusIgnoreCase("Completed"));
        stats.put("totalCertifications", certificationRepository.count());
        stats.put("totalProjects", projectRepository.count());
        return stats;
    }
}
