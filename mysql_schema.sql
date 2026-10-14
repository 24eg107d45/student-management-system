-- ==========================================================
-- Student Skill & Internship Management System
-- Database Schema for MySQL 8.x / Aiven Cloud MySQL
-- ==========================================================

CREATE DATABASE IF NOT EXISTS aimldg;
USE aimldg;

-- 1. Students Table
CREATE TABLE IF NOT EXISTS students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    roll_number VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    department VARCHAR(50) NOT NULL,
    year_of_study INT NOT NULL,
    cgpa DOUBLE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level VARCHAR(50),
    verified BOOLEAN DEFAULT FALSE,
    student_id BIGINT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Internships Table
CREATE TABLE IF NOT EXISTS internships (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    stipend VARCHAR(50),
    status VARCHAR(50),
    certificate_url TEXT,
    student_id BIGINT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Certifications Table
CREATE TABLE IF NOT EXISTS certifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    issuing_organization VARCHAR(100) NOT NULL,
    issue_date VARCHAR(50),
    credential_url TEXT,
    student_id BIGINT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    technologies_used VARCHAR(255),
    project_url TEXT,
    description TEXT,
    student_id BIGINT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample Seed Data
INSERT INTO students (roll_number, name, email, phone, department, year_of_study, cgpa)
VALUES 
('24EG107D45', 'Umesh Reddy', 'umesh.reddy@college.edu', '+91 9876543210', 'AIML', 3, 8.85),
('24EG107D01', 'Ananya Sharma', 'ananya.s@college.edu', '+91 9876543211', 'CSE', 3, 9.10)
ON DUPLICATE KEY UPDATE name=VALUES(name);

INSERT INTO skills (skill_name, proficiency_level, verified, student_id)
VALUES 
('React.js', 'Expert', TRUE, 1),
('Spring Boot', 'Advanced', TRUE, 1),
('MySQL', 'Expert', TRUE, 1),
('Python', 'Expert', TRUE, 2);

INSERT INTO internships (company_name, role, start_date, end_date, stipend, status, certificate_url, student_id)
VALUES 
('Amazon Web Services', 'Cloud Solutions Intern', '2026-05-01', '2026-07-31', '₹45,000 / month', 'Completed', 'https://aws.amazon.com', 1);

INSERT INTO certifications (title, issuing_organization, issue_date, credential_url, student_id)
VALUES 
('AWS Certified Solutions Architect', 'Amazon Web Services', '2026-06-15', 'https://aws.amazon.com/certification/', 1);

INSERT INTO projects (title, technologies_used, project_url, description, student_id)
VALUES 
('Student Skill & Internship Management Portal', 'React 18, Spring Boot 3, MySQL', 'https://github.com/24eg107d45/student-management-system', 'Full stack career matrix platform for technical evaluations.', 1);
