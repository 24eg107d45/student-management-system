# Student Skill & Internship Management System - Frontend

Modern, responsive Single-Page Application (SPA) designed to interface with the Spring Boot backend REST APIs for academic skill and internship tracking.

---

## 🌟 Frontend Features

- **Dashboard KPI Analytics:** Real-time summary cards for total registered students, technical skills, soft skills, active internships, and certifications.
- **Students Directory:** Dynamic search by Student Name or Roll Number / USN, with real-time department filtering.
- **Interactive Student Profiles:** Tabbed modal view allowing 1-click addition of Skills, Internships, Certifications, and Academic Projects.
- **Data Export & Printing:**
  - 1-Click CSV export of student and placement records.
  - Printable official Student Bio-Data / Resume formatting.
- **Responsive Design:** Optimized for both mobile devices and desktop screens using modern CSS Flexbox and Grid.

---

## 🛠️ Tech Stack

- **HTML5:** Semantic markup with modal dialogs and form validation.
- **CSS3:** Modern design system utilizing CSS variables, responsive layouts, glassmorphism card designs, and toast notifications.
- **JavaScript (ES6+):** Vanilla JavaScript using `fetch` API for asynchronous REST communication, dynamic DOM manipulation, and client-side filtering.
- **FontAwesome:** Iconography for enhanced visual communication.

---

## 📂 Project Structure

```text
student-management-frontend/
├── css/
│   └── styles.css       # Full styling and responsive layouts
├── js/
│   └── app.js           # Asynchronous REST API consumer & DOM logic
├── index.html           # Main Single-Page Application
└── README.md            # Frontend documentation
```

---

## 🚀 How to Run

1. Open `index.html` directly in any modern web browser (Chrome, Edge, Firefox).
2. Ensure the Spring Boot backend server is running on `http://localhost:8080` (or configured to the live cloud URL).
