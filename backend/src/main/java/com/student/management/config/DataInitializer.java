package com.student.management.config;

import com.student.management.entity.*;
import com.student.management.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(
            StudentRepository studentRepo,
            SkillRepository skillRepo,
            InternshipRepository internshipRepo,
            CertificationRepository certRepo,
            ProjectRepository projectRepo) {
        return args -> {
            if (studentRepo.count() == 0) {
                // Seed primary student
                Student s = new Student();
                s.setName("Umesh Reddy");
                s.setRollNumber("24eg107d45");
                s.setEmail("24eg107d45@anurag.edu.in");
                s.setDepartment("AIML");
                s.setSemester(5);
                s.setPhone("9391148488");
                s = studentRepo.save(s);

                // Skills
                Skill sk1 = new Skill("Java & Spring Boot", "Technical", "Advanced", s);
                Skill sk2 = new Skill("Machine Learning (Python)", "Technical", "Intermediate", s);
                Skill sk3 = new Skill("MySQL Database Design", "Technical", "Advanced", s);
                Skill sk4 = new Skill("Problem Solving & Team Leadership", "Soft", "Expert", s);
                skillRepo.save(sk1);
                skillRepo.save(sk2);
                skillRepo.save(sk3);
                skillRepo.save(sk4);

                // Internship
                Internship in1 = new Internship(
                        "Infosys Springboard",
                        "AI & Full-Stack Intern",
                        "2026-06-01",
                        "2026-08-31",
                        "Completed",
                        "Certificate & Stipend",
                        "Remote",
                        "Industry Mentor",
                        s
                );
                internshipRepo.save(in1);

                // Certification
                Certification c1 = new Certification(
                        "Enterprise Java & Spring Boot Development",
                        "Coursera / Oracle",
                        "2026-07-15",
                        "https://coursera.org/verify",
                        s
                );
                certRepo.save(c1);

                // Project
                Project p1 = new Project(
                        "Student Skill & Internship Management Portal",
                        "Enterprise portal to track students, placements, skill matrices, and export bio-data.",
                        "Java 17, Spring Boot, MySQL, REST APIs, HTML/CSS/JS",
                        "https://github.com/24eg107d45/student-management-system",
                        s
                );
                projectRepo.save(p1);

                // Add a second student for richer dashboard analytics
                Student s2 = new Student();
                s2.setName("Ananya Rao");
                s2.setRollNumber("24eg107d12");
                s2.setEmail("ananya.rao@anurag.edu.in");
                s2.setDepartment("AIML");
                s2.setSemester(5);
                s2.setPhone("9876543210");
                s2 = studentRepo.save(s2);

                Skill sk5 = new Skill("Data Structures & Algorithms", "Technical", "Advanced", s2);
                Skill sk6 = new Skill("Deep Learning & PyTorch", "Technical", "Intermediate", s2);
                skillRepo.save(sk5);
                skillRepo.save(sk6);

                Internship in2 = new Internship(
                        "Google Cloud Next",
                        "Cloud AI Intern",
                        "2026-07-01",
                        "2026-09-30",
                        "Ongoing",
                        "Rs 15,000 / mo",
                        "Hybrid",
                        "Technical Lead",
                        s2
                );
                internshipRepo.save(in2);

                System.out.println("==================================================");
                System.out.println(">>> DataInitializer: Verified student demo records seeded!");
                System.out.println("==================================================");
            }
        };
    }
}
