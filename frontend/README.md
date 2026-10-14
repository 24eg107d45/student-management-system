# Student Management System - React Frontend ⚛️

This is the modern **React (Single Page Application)** frontend for the **Student Skill & Internship Management System**, built with **Vite**, **React 18**, and **Lucide Icons**.

---

## 🚀 Features

- **Executive Analytics Dashboard**:
  - Live metric cards (Enrolled Students, Skills Logged, Internships Secured, Global Certifications, Academic Projects).
  - Department distribution progress bars.
  - Quick recent students table.
- **Interactive Student Directory**:
  - Real-time search across student names, roll numbers, and emails.
  - Department filtering (CSE, AIML, IT, ECE, EEE, MECH, CIVIL) and Year-of-Study filtering.
  - 1-Click CSV export of student data.
- **Comprehensive Student Profile Portfolio**:
  - **Technical Skills**: Proficiency badges (Beginner, Intermediate, Advanced, Expert) and faculty verification tags.
  - **Corporate Internships**: Company, role, duration, stipend, and credentials.
  - **Global Certifications**: Title, issuing organization, dates, and verification links.
  - **Academic Projects**: Title, tech stack tags, live GitHub/demo links, and descriptions.
  - **Printable Bio-Data / Resume**: Clean 1-click printable resume format for placements.

---

## 🛠️ Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
The React development server runs at `http://localhost:5173`.
All API requests to `/api/*` are automatically proxied to the Spring Boot backend running on `http://localhost:8080`.

### 3. Production Build
```bash
npm run build
```
Creates an optimized production bundle inside the `dist/` folder.

---

## 📁 Project Structure

```text
frontend/
├── index.html                 # HTML entry point
├── package.json               # NPM scripts and dependencies
├── vite.config.js             # Vite build & proxy configuration
└── src/
    ├── main.jsx               # React DOM bootstrap
    ├── App.jsx                # Main application state and routing
    ├── index.css              # Custom responsive styles and print CSS
    ├── services/
    │   └── api.js             # REST API client connecting to Spring Boot
    └── components/
        ├── Navbar.jsx         # Sticky navigation header
        ├── Dashboard.jsx      # Metrics and department analytics
        ├── StudentList.jsx    # Searchable directory with CSV export
        ├── StudentProfile.jsx # Student details and portfolio tabs
        ├── StudentModal.jsx   # Add/Edit student form
        ├── SkillModal.jsx     # Add skill modal
        ├── InternshipModal.jsx# Add internship modal
        ├── CertificationModal.jsx # Add certification modal
        └── ProjectModal.jsx   # Add project modal
```
