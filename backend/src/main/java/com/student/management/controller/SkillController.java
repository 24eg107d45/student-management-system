package com.student.management.controller;

import com.student.management.entity.Skill;
import com.student.management.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Skill>> getSkillsByStudentId(@PathVariable Long studentId) {
        return ResponseEntity.ok(skillService.getSkillsByStudentId(studentId));
    }

    @PostMapping("/student/{studentId}")
    public ResponseEntity<Skill> addSkill(@PathVariable Long studentId, @RequestBody Skill skill) {
        Skill created = skillService.addSkill(studentId, skill);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{skillId}")
    public ResponseEntity<Void> deleteSkill(@PathVariable Long skillId) {
        skillService.deleteSkill(skillId);
        return ResponseEntity.noContent().build();
    }
}
