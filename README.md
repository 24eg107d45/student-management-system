# Student Skill and Internship Management System

A full-stack web application designed for academic institutions to centralize, track, and manage student skill developments, technical competencies, industry internships, certifications, and academic projects.

---

## 🚀 Live Demo & Repository
- **Live Deployment URL:** [Render Cloud Live Link](https://dashboard.render.com/) *(Enter your deployed URL here)*
- **GitHub Repository:** [https://github.com/24eg107d45/student-management-system](https://github.com/24eg107d45/student-management-system)

---

## 🌟 Key Features

1. **Student Profiles & Biodata Management**
   - Comprehensive student registry with Roll Number, Name, Department, Semester, Email, and Phone.
   - 1-Click Printable Bio-Data / PDF Export with complete skill portfolio and internship records.

2. **Skills & Competency Tracking**
   - Categorization by Technical and Soft skills.
   - Proficiency level ratings (Beginner, Intermediate, Advanced, Expert).

3. **Internship & Experience Monitoring**
   - Track company names, roles, stipend amounts, durations, and completion statuses (Ongoing, Completed).

4. **Certifications & Project Showcase**
   - Document course certifications, issuing organizations, and credential dates.
   - Track student academic & hackathon projects with tech stacks and live repository links.

5. **Analytics & Search**
   - Live Dashboard KPI cards (Total Students, Active Skills, Internships, Projects).
   - Real-time search by Student Name or Roll Number with instant department filtering.
   - Export all student records to CSV with one click.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | HTML5, Modern CSS3 (Responsive Grid/Flexbox), Vanilla JavaScript (ES6+), FontAwesome Icons |
| **Backend** | Java 17, Spring Boot 3.3.4 (REST API Controllers, Services, Repositories) |
| **Persistence / ORM** | Spring Data JPA, Hibernate ORM |
| **Database** | MySQL 8.0 (Local / Cloud) & Embedded H2 for resilient cloud deployments |
| **Build & Deployment** | Maven, Docker (Multi-stage build), Render Cloud Hosting |

---

## 📂 Project Architecture

```text
student-management-system/
├── src/
│   ├── main/
│   │   ├── java/com/student/management/
│   │   │   ├── controller/      # REST API Endpoints
│   │   │   ├── entity/          # JPA Entities (Student, Skill, Internship, etc.)
│   │   │   ├── exception/       # Global Exception Handler
│   │   │   ├── repository/     # Spring Data JPA Interfaces
│   │   │   ├── service/         # Business Logic Layer
│   │   │   └── StudentManagementApplication.java
│   │   └── resources/
│   │       ├── static/          # Full-Stack Frontend (HTML, CSS, JS)
│   │       │   ├── index.html
│   │       │   ├── styles.css
│   │       │   └── app.js
│   │       ├── application.properties
│   │       └── application-cloud.properties
├── Dockerfile                   # Cloud multi-stage container build
├── pom.xml                      # Maven dependencies
└── README.md
```

---

## 💻 Local Setup & Execution

1. **Clone the repository:**
   ```bash
   git clone https://github.com/24eg107d45/student-management-system.git
   cd student-management-system
   ```

2. **Configure Database (MySQL):**
   - Create a database named `aimldg` in your local MySQL instance.
   - Ensure MySQL is running on `localhost:3306` with user `root`.

3. **Run the Application:**
   ```bash
   mvn spring-boot:run
   ```
   *(Or double-click `Start-Student-System.bat` on Windows Desktop)*

4. **Access the Portal:**
   - Open your browser to `http://localhost:8080`
