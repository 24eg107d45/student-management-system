// API Base Endpoints
const API = {
  students: "/api/students",
  skills: "/api/skills",
  internships: "/api/internships",
  certifications: "/api/certifications",
  projects: "/api/projects",
  dashboard: "/api/dashboard/stats"
};

let allStudents = [];
let allInternships = [];
let currentViewingStudentId = null;

// Initialize app on load
document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
  loadStudents();
  loadInternships();

  // Close modals on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.active").forEach(m => m.classList.remove("active"));
    }
  });
});

// Toast notification helper
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === "success" ? "✓" : "⚠"}</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Modal handling
function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("active");
}

// Close when clicking outside modal box (backdrop)
function handleBackdropClick(event, modalId) {
  if (event.target.id === modalId) {
    closeModal(modalId);
  }
}

// Tab Switching
function switchTab(tabName) {
  document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-links button").forEach(el => el.classList.remove("active"));

  const targetTab = document.getElementById(`tab-${tabName}`);
  if (targetTab) {
    targetTab.classList.add("active");
  }

  // Update navbar active state
  const navBtns = document.querySelectorAll(".nav-links button");
  if (tabName === "dashboard") navBtns[0].classList.add("active");
  else if (tabName === "students") navBtns[1].classList.add("active");
  else if (tabName === "internships") navBtns[2].classList.add("active");
  else if (tabName === "profile") {
    const profileBtn = document.getElementById("nav-profile-btn");
    profileBtn.style.display = "inline-flex";
    profileBtn.classList.add("active");
  }

  if (tabName === "dashboard") loadDashboard();
  if (tabName === "students") loadStudents();
  if (tabName === "internships") loadInternships();
}

// 1. Dashboard Stats & Quick Students Table
async function loadDashboard() {
  try {
    const res = await fetch(API.dashboard);
    if (res.ok) {
      const stats = await res.json();
      document.getElementById("stat-students").textContent = stats.totalStudents || 0;
      document.getElementById("stat-tech-skills").textContent = stats.technicalSkills || 0;
      document.getElementById("stat-soft-skills").textContent = stats.softSkills || 0;
      document.getElementById("stat-active-internships").textContent = stats.ongoingInternships || 0;
      document.getElementById("stat-certifications").textContent = stats.totalCertifications || 0;
      document.getElementById("stat-projects").textContent = stats.totalProjects || 0;
    }
  } catch (err) {
    console.error("Failed to load dashboard metrics", err);
  }

  try {
    const res = await fetch(API.students);
    if (res.ok) {
      allStudents = await res.json();
      renderDashboardStudents(allStudents.slice(0, 5));
    }
  } catch (err) {
    console.error("Failed to load dashboard students", err);
  }
}

function renderDashboardStudents(students) {
  const tbody = document.getElementById("dashboard-students-body");
  if (students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color: #94a3b8;">No student records found. Click "+ Register Student" above to add one.</td></tr>`;
    return;
  }

  tbody.innerHTML = students.map(s => `
    <tr>
      <td><strong>${s.rollNumber}</strong></td>
      <td>${s.name}</td>
      <td>${s.department || "N/A"}</td>
      <td>Sem ${s.semester || 1}</td>
      <td>${s.email}</td>
      <td>${s.phone || "N/A"}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="viewStudentProfile(${s.id})">View Profile</button>
      </td>
    </tr>
  `).join("");
}

// 2. Students Directory Management
async function loadStudents() {
  try {
    const res = await fetch(API.students);
    if (res.ok) {
      allStudents = await res.json();
      renderStudentsTable(allStudents);
    }
  } catch (err) {
    showToast("Error loading student records", "error");
  }
}

function renderStudentsTable(students) {
  const tbody = document.getElementById("students-table-body");
  if (students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color: #94a3b8;">No students found matching your criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = students.map(s => `
    <tr>
      <td><strong>${s.rollNumber}</strong></td>
      <td>${s.name}</td>
      <td>${s.department || "N/A"}</td>
      <td>Sem ${s.semester || 1}</td>
      <td>${s.email}</td>
      <td><span class="badge badge-tech">${s.skills ? s.skills.length : 0} Skills</span></td>
      <td><span class="badge badge-ongoing">${s.internships ? s.internships.length : 0} Internships</span></td>
      <td style="display:flex; gap: 0.4rem;">
        <button class="btn btn-sm btn-primary" onclick="viewStudentProfile(${s.id})">Profile</button>
        <button class="btn btn-sm btn-secondary" onclick="openEditStudentModal(${s.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${s.id})">Delete</button>
      </td>
    </tr>
  `).join("");
}

function handleStudentSearch() {
  const query = document.getElementById("student-search-input").value.toLowerCase().trim();
  const dept = document.getElementById("department-filter").value.toLowerCase().trim();

  const filtered = allStudents.filter(s => {
    const matchesQuery = !query || 
      s.name.toLowerCase().includes(query) || 
      s.rollNumber.toLowerCase().includes(query);
    const matchesDept = !dept || (s.department && s.department.toLowerCase().includes(dept));
    return matchesQuery && matchesDept;
  });

  renderStudentsTable(filtered);
}

// Student Modal (Add & Edit)
function openStudentModal() {
  document.getElementById("student-form").reset();
  document.getElementById("student-id").value = "";
  document.getElementById("student-modal-title").textContent = "Register New Student";
  openModal("modal-student");
}

function openEditStudentModal(id) {
  const student = allStudents.find(s => s.id === id);
  if (!student) return;

  document.getElementById("student-id").value = student.id;
  document.getElementById("student-name").value = student.name;
  document.getElementById("student-roll").value = student.rollNumber;
  document.getElementById("student-email").value = student.email;
  document.getElementById("student-dept").value = student.department || "";
  document.getElementById("student-semester").value = student.semester || 1;
  document.getElementById("student-phone").value = student.phone || "";
  document.getElementById("student-modal-title").textContent = "Edit Student Profile";
  openModal("modal-student");
}

async function handleSaveStudent(e) {
  e.preventDefault();
  const id = document.getElementById("student-id").value;
  const payload = {
    name: document.getElementById("student-name").value.trim(),
    rollNumber: document.getElementById("student-roll").value.trim(),
    email: document.getElementById("student-email").value.trim(),
    department: document.getElementById("student-dept").value.trim(),
    semester: parseInt(document.getElementById("student-semester").value) || 1,
    phone: document.getElementById("student-phone").value.trim()
  };

  try {
    const url = id ? `${API.students}/${id}` : API.students;
    const method = id ? "PUT" : "POST";

    const res = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      showToast(id ? "Student profile updated successfully" : "Student registered successfully");
      closeModal("modal-student");
      loadStudents();
      loadDashboard();
      if (currentViewingStudentId == id) {
        viewStudentProfile(id);
      }
    } else {
      const err = await res.json();
      showToast(err.message || "Failed to save student", "error");
    }
  } catch (err) {
    showToast("Server error while saving student", "error");
  }
}

async function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this student profile and all associated skills/internships?")) return;

  try {
    const res = await fetch(`${API.students}/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Student deleted successfully");
      loadStudents();
      loadDashboard();
      if (currentViewingStudentId == id) {
        switchTab("students");
      }
    } else {
      showToast("Failed to delete student", "error");
    }
  } catch (err) {
    showToast("Server error while deleting student", "error");
  }
}

// 3. View Full Student Profile & Academic Portfolio
async function viewStudentProfile(id) {
  currentViewingStudentId = id;
  try {
    const res = await fetch(`${API.students}/${id}`);
    if (!res.ok) throw new Error("Student not found");
    const student = await res.json();

    const container = document.getElementById("profile-container");
    container.innerHTML = `
      <div class="profile-banner">
        <div class="profile-meta">
          <h2>${student.name}</h2>
          <p>🎓 Department: <strong>${student.department || "General"}</strong> &bull; Semester ${student.semester || 1} &bull; Roll/USN: <strong>${student.rollNumber}</strong></p>
          <div class="profile-tags">
            <span class="profile-tag">✉ ${student.email}</span>
            <span class="profile-tag">📞 ${student.phone || "No phone provided"}</span>
            <span class="profile-tag" style="background:#16a34a;">Status: Active Student</span>
          </div>
        </div>
        <div style="display:flex; gap:0.6rem; flex-wrap:wrap;">
          <button class="btn btn-secondary" onclick="printStudentProfile()">🖨️ Print Bio-Data (PDF)</button>
          <button class="btn btn-secondary" onclick="openEditStudentModal(${student.id})">Edit Profile</button>
          <button class="btn btn-primary" onclick="switchTab('students')">← Back to List</button>
        </div>
      </div>

      <div class="profile-grid">
        <!-- Skills Section -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Technical & Soft Skills (${student.skills ? student.skills.length : 0})</h3>
            <button class="btn btn-sm btn-primary" onclick="openModal('modal-skill')">+ Add Skill</button>
          </div>
          <div class="card-body">
            <div id="profile-skills-list" class="item-list">
              ${renderSkillsList(student.skills || [])}
            </div>
          </div>
        </div>

        <!-- Internships Section -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Internships & Work Experience (${student.internships ? student.internships.length : 0})</h3>
            <button class="btn btn-sm btn-primary" onclick="openModal('modal-internship')">+ Add Internship</button>
          </div>
          <div class="card-body">
            <div id="profile-internships-list" class="item-list">
              ${renderInternshipsList(student.internships || [])}
            </div>
          </div>
        </div>

        <!-- Certifications Section -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Certifications & Credentials (${student.certifications ? student.certifications.length : 0})</h3>
            <button class="btn btn-sm btn-primary" onclick="openModal('modal-cert')">+ Add Certificate</button>
          </div>
          <div class="card-body">
            <div id="profile-certs-list" class="item-list">
              ${renderCertsList(student.certifications || [])}
            </div>
          </div>
        </div>

        <!-- Academic Projects Section -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Academic & Portfolio Projects (${student.projects ? student.projects.length : 0})</h3>
            <button class="btn btn-sm btn-primary" onclick="openModal('modal-project')">+ Add Project</button>
          </div>
          <div class="card-body">
            <div id="profile-projects-list" class="item-list">
              ${renderProjectsList(student.projects || [])}
            </div>
          </div>
        </div>
      </div>
    `;

    switchTab("profile");
  } catch (err) {
    showToast("Failed to fetch student profile", "error");
  }
}

function renderSkillsList(skills) {
  if (!skills || skills.length === 0) {
    return `<p style="color: #94a3b8; font-size: 0.875rem;">No skills added yet. Click "+ Add Skill" above.</p>`;
  }

  return skills.map(s => `
    <div class="item-card">
      <div class="item-card-left">
        <h4>${s.skillName}</h4>
        <p>
          <span class="badge ${s.category === 'Technical' ? 'badge-tech' : 'badge-soft'}">${s.category}</span>
          <span style="margin-left: 0.4rem; color: #475569; font-weight: 500;">Proficiency: ${s.proficiencyLevel}</span>
        </p>
      </div>
      <button class="btn btn-sm btn-danger" onclick="deleteSkill(${s.id})" title="Remove skill">&times;</button>
    </div>
  `).join("");
}

function renderInternshipsList(internships) {
  if (!internships || internships.length === 0) {
    return `<p style="color: #94a3b8; font-size: 0.875rem;">No internships recorded yet. Click "+ Add Internship" above.</p>`;
  }

  return internships.map(i => `
    <div class="item-card">
      <div class="item-card-left">
        <h4>${i.role} @ ${i.companyName}</h4>
        <p>
          <span class="badge badge-${i.status ? i.status.toLowerCase() : 'ongoing'}">${i.status}</span> &bull; 
          ${i.mode || 'Hybrid'} &bull; ${i.startDate || ''} to ${i.endDate || 'Present'}
        </p>
        ${i.stipend ? `<p style="font-size:0.775rem; color:#16a34a; font-weight:600;">Stipend: ${i.stipend}</p>` : ''}
        ${i.supervisor ? `<p style="font-size:0.75rem; color:#64748b;">Supervisor: ${i.supervisor}</p>` : ''}
      </div>
      <button class="btn btn-sm btn-danger" onclick="deleteInternship(${i.id})" title="Delete internship">&times;</button>
    </div>
  `).join("");
}

function renderCertsList(certs) {
  if (!certs || certs.length === 0) {
    return `<p style="color: #94a3b8; font-size: 0.875rem;">No certifications added yet.</p>`;
  }

  return certs.map(c => `
    <div class="item-card">
      <div class="item-card-left">
        <h4>${c.title}</h4>
        <p>${c.issuingOrganization || "Organization"} &bull; ${c.issueDate || ""}</p>
        ${c.credentialUrl ? `<a href="${c.credentialUrl}" target="_blank" style="font-size:0.75rem; color:var(--primary); font-weight:600;">Verify Credential ↗</a>` : ''}
      </div>
      <button class="btn btn-sm btn-danger" onclick="deleteCert(${c.id})" title="Remove certificate">&times;</button>
    </div>
  `).join("");
}

function renderProjectsList(projects) {
  if (!projects || projects.length === 0) {
    return `<p style="color: #94a3b8; font-size: 0.875rem;">No projects recorded yet.</p>`;
  }

  return projects.map(p => `
    <div class="item-card">
      <div class="item-card-left">
        <h4>${p.title}</h4>
        ${p.technologiesUsed ? `<p style="color:#2563eb; font-weight:600; font-size:0.8rem;">Stack: ${p.technologiesUsed}</p>` : ''}
        ${p.description ? `<p style="color:#64748b; font-size:0.825rem; margin-top:0.2rem;">${p.description}</p>` : ''}
        ${p.projectUrl ? `<a href="${p.projectUrl}" target="_blank" style="font-size:0.75rem; color:var(--primary); font-weight:600;">Project Link ↗</a>` : ''}
      </div>
      <button class="btn btn-sm btn-danger" onclick="deleteProject(${p.id})" title="Remove project">&times;</button>
    </div>
  `).join("");
}

// 4. Sub-Entity Handlers (Skills, Internships, Certifications, Projects)
async function handleAddSkill(e) {
  e.preventDefault();
  if (!currentViewingStudentId) return;

  const payload = {
    skillName: document.getElementById("skill-name").value.trim(),
    category: document.getElementById("skill-category").value,
    proficiencyLevel: document.getElementById("skill-level").value
  };

  try {
    const res = await fetch(`${API.skills}/student/${currentViewingStudentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      showToast("Skill added successfully");
      closeModal("modal-skill");
      document.getElementById("skill-form").reset();
      viewStudentProfile(currentViewingStudentId);
      loadDashboard();
    } else {
      showToast("Failed to add skill", "error");
    }
  } catch (err) {
    showToast("Server error while adding skill", "error");
  }
}

async function deleteSkill(skillId) {
  if (!confirm("Remove this skill?")) return;
  try {
    const res = await fetch(`${API.skills}/${skillId}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Skill removed");
      viewStudentProfile(currentViewingStudentId);
      loadDashboard();
    }
  } catch (err) {
    showToast("Failed to delete skill", "error");
  }
}

async function handleAddInternship(e) {
  e.preventDefault();
  if (!currentViewingStudentId) return;

  const payload = {
    companyName: document.getElementById("intern-company").value.trim(),
    role: document.getElementById("intern-role").value.trim(),
    mode: document.getElementById("intern-mode").value,
    status: document.getElementById("intern-status").value,
    startDate: document.getElementById("intern-start").value,
    endDate: document.getElementById("intern-end").value,
    stipend: document.getElementById("intern-stipend").value.trim(),
    supervisor: document.getElementById("intern-supervisor").value.trim()
  };

  try {
    const res = await fetch(`${API.internships}/student/${currentViewingStudentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      showToast("Internship record saved successfully");
      closeModal("modal-internship");
      document.getElementById("internship-form").reset();
      viewStudentProfile(currentViewingStudentId);
      loadDashboard();
      loadInternships();
    } else {
      showToast("Failed to save internship", "error");
    }
  } catch (err) {
    showToast("Server error while adding internship", "error");
  }
}

async function deleteInternship(id) {
  if (!confirm("Delete this internship entry?")) return;
  try {
    const res = await fetch(`${API.internships}/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Internship deleted");
      viewStudentProfile(currentViewingStudentId);
      loadDashboard();
      loadInternships();
    }
  } catch (err) {
    showToast("Failed to delete internship", "error");
  }
}

async function handleAddCert(e) {
  e.preventDefault();
  if (!currentViewingStudentId) return;

  const payload = {
    title: document.getElementById("cert-title").value.trim(),
    issuingOrganization: document.getElementById("cert-org").value.trim(),
    issueDate: document.getElementById("cert-date").value,
    credentialUrl: document.getElementById("cert-url").value.trim()
  };

  try {
    const res = await fetch(`${API.certifications}/student/${currentViewingStudentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      showToast("Certification saved");
      closeModal("modal-cert");
      document.getElementById("cert-form").reset();
      viewStudentProfile(currentViewingStudentId);
      loadDashboard();
    }
  } catch (err) {
    showToast("Error saving certification", "error");
  }
}

async function deleteCert(id) {
  if (!confirm("Delete certification?")) return;
  try {
    const res = await fetch(`${API.certifications}/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Certification removed");
      viewStudentProfile(currentViewingStudentId);
      loadDashboard();
    }
  } catch (err) {
    showToast("Failed to delete certification", "error");
  }
}

async function handleAddProject(e) {
  e.preventDefault();
  if (!currentViewingStudentId) return;

  const payload = {
    title: document.getElementById("proj-title").value.trim(),
    technologiesUsed: document.getElementById("proj-tech").value.trim(),
    description: document.getElementById("proj-desc").value.trim(),
    projectUrl: document.getElementById("proj-url").value.trim()
  };

  try {
    const res = await fetch(`${API.projects}/student/${currentViewingStudentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      showToast("Project saved successfully");
      closeModal("modal-project");
      document.getElementById("project-form").reset();
      viewStudentProfile(currentViewingStudentId);
      loadDashboard();
    }
  } catch (err) {
    showToast("Error saving project", "error");
  }
}

async function deleteProject(id) {
  if (!confirm("Delete project?")) return;
  try {
    const res = await fetch(`${API.projects}/${id}`, { method: "DELETE" });
    if (res.ok) {
      showToast("Project removed");
      viewStudentProfile(currentViewingStudentId);
      loadDashboard();
    }
  } catch (err) {
    showToast("Failed to delete project", "error");
  }
}

// 5. Admin / All Internships Tab
async function loadInternships() {
  try {
    const res = await fetch(API.internships);
    if (res.ok) {
      allInternships = await res.json();
      renderAllInternshipsTable(allInternships);
    }
  } catch (err) {
    console.error("Failed to load internships", err);
  }
}

function renderAllInternshipsTable(internships) {
  const tbody = document.getElementById("internships-table-body");
  if (!internships || internships.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#94a3b8;">No internship placements recorded yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = internships.map(i => `
    <tr>
      <td><strong>${i.companyName}</strong></td>
      <td>${i.role}</td>
      <td>${i.student ? i.student.name : "N/A"}</td>
      <td>${i.student ? i.student.rollNumber : "N/A"}</td>
      <td>${i.mode || "Hybrid"}</td>
      <td>${i.startDate || ""} to ${i.endDate || "Present"}</td>
      <td>${i.stipend || "Unpaid"}</td>
      <td><span class="badge badge-${i.status ? i.status.toLowerCase() : 'ongoing'}">${i.status}</span></td>
    </tr>
  `).join("");
}

function filterInternshipTable() {
  const query = document.getElementById("internship-search-input").value.toLowerCase().trim();
  const status = document.getElementById("internship-status-filter").value.toLowerCase().trim();

  const filtered = allInternships.filter(i => {
    const matchesQuery = !query ||
      i.companyName.toLowerCase().includes(query) ||
      i.role.toLowerCase().includes(query) ||
      (i.student && i.student.name.toLowerCase().includes(query));
    const matchesStatus = !status || (i.status && i.status.toLowerCase() === status);
    return matchesQuery && matchesStatus;
  });

  renderAllInternshipsTable(filtered);
}

// 6. OFFICIAL EXPORT FEATURES (CSV & Printable Bio-Data)
function exportStudentsCSV() {
  if (!allStudents || allStudents.length === 0) {
    showToast("No student records to export", "error");
    return;
  }
  let csv = "Roll Number,Full Name,Department,Semester,Email,Phone,Skills Count,Internships Count\n";
  allStudents.forEach(s => {
    csv += `"${s.rollNumber}","${s.name}","${s.department || ''}","${s.semester || ''}","${s.email}","${s.phone || ''}",${s.skills ? s.skills.length : 0},${s.internships ? s.internships.length : 0}\n`;
  });
  downloadCSV(csv, "Official_Students_Registry.csv");
}

function exportInternshipsCSV() {
  if (!allInternships || allInternships.length === 0) {
    showToast("No internship records to export", "error");
    return;
  }
  let csv = "Company,Role,Student Name,Roll Number,Mode,Status,Start Date,End Date,Stipend,Supervisor\n";
  allInternships.forEach(i => {
    csv += `"${i.companyName}","${i.role}","${i.student ? i.student.name : ''}","${i.student ? i.student.rollNumber : ''}","${i.mode || ''}","${i.status || ''}","${i.startDate || ''}","${i.endDate || ''}","${i.stipend || ''}","${i.supervisor || ''}"\n`;
  });
  downloadCSV(csv, "Official_Internship_Placements_Report.csv");
}

function downloadCSV(csvContent, filename) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  showToast(`Exported ${filename} successfully`);
}

function printStudentProfile() {
  window.print();
}