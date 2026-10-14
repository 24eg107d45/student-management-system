package com.student.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class StudentManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentManagementApplication.class, args);
        System.out.println("==================================================");
        System.out.println(" Student Skill & Internship Management System Running!");
        System.out.println(" Open UI in browser at: http://localhost:8080");
        System.out.println("==================================================");
    }
}
