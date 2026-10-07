package com.student.management.service;

import com.student.management.entity.Skill;
import com.student.management.entity.Student;
import com.student.management.exception.ResourceNotFoundException;
import com.student.management.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private StudentService studentService;

    public List<Skill> getSkillsByStudentId(Long studentId) {
        return skillRepository.findByStudentId(studentId);
    }

    public Skill addSkill(Long studentId, Skill skill) {
        Student student = studentService.getStudentById(studentId);
        skill.setStudent(student);
        return skillRepository.save(skill);
    }

    public void deleteSkill(Long skillId) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found with id: " + skillId));
        skillRepository.delete(skill);
    }
}
