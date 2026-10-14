# Student Skill & Internship Management System - Backend

Enterprise-grade Java backend built using **Spring Boot 3.3.4**, **Spring Data JPA**, and **Hibernate ORM** to provide secure, robust RESTful APIs for student profile and placement management.

---

## 🏛️ Layered Architecture Pattern

The backend strictly follows industry-standard **Layered Architecture**:

1. **Controller Layer (`controller/`):**
   - Handles incoming HTTP requests (GET, POST, PUT, DELETE).
   - Annotations: `@RestController`, `@RequestMapping`, `@CrossOrigin(origins = "*")`.
2. **Service Layer (`service/`):**
   - Encapsulates business logic, transactional validations, and analytics aggregation.
   - Annotations: `@Service`, `@Transactional`.
3. **Repository Layer (`repository/`):**
   - Data access abstraction utilizing Spring Data JPA for type-safe database queries.
   - Extends `JpaRepository<Entity, Long>`.
4. **Entity Layer (`entity/`):**
   - Relational database schema models mapped with Hibernate ORM.
   - Annotations: `@Entity`, `@Table`, `@OneToMany`, `@ManyToOne`, `@JoinColumn`.
5. **Exception Handling (`exception/`):**
   - Centralized global error handling with `@RestControllerAdvice` returning structured JSON error payloads.

---

## 📡 REST API Specifications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard/stats` | Retrieve aggregated KPI counts (Students, Skills, Internships, Projects) |
| `GET` | `/api/students` | Get all students (Supports `?search=query` for name/roll search) |
| `GET` | `/api/students/{id}` | Get complete student profile with nested skills & internships |
| `POST` | `/api/students` | Register a new student profile |
| `PUT` | `/api/students/{id}` | Update an existing student profile |
| `DELETE` | `/api/students/{id}` | Remove a student profile and cascade delete associated records |
| `POST` | `/api/skills/student/{studentId}` | Add a technical/soft skill to a student |
| `DELETE` | `/api/skills/{id}` | Remove a skill |
| `POST` | `/api/internships/student/{studentId}` | Record an industry internship |
| `DELETE` | `/api/internships/{id}` | Remove an internship record |
| `POST` | `/api/certifications/student/{studentId}` | Add a verified certification |
| `DELETE` | `/api/certifications/{id}` | Remove a certification |
| `POST` | `/api/projects/student/{studentId}` | Add an academic / hackathon project |
| `DELETE` | `/api/projects/{id}` | Remove a project |

---

## 🛠️ Tech Stack & Database

- **Language:** Java 17
- **Framework:** Spring Boot 3.3.4
- **ORM / Persistence:** Spring Data JPA, Hibernate 6
- **Database:** MySQL 8.0 (Local / Cloud) + Resilient H2 Embedded Engine
- **Build Tool:** Apache Maven 3.9+
