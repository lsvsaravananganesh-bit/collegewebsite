# Ganesh Institute of Technology (GIT)

> **Official College Information Portal, Student Self-Service Dashboard & Administrative Management System**  
> *Kurnool, Andhra Pradesh · Autonomous Engineering Institution*

[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-blue?logo=github)](https://lsvsaravananganesh-bit.github.io/collegewebsite/)
[![Standard](https://img.shields.io/badge/Code-HTML5%20%7C%20CSS3%20%7C%20ES6+-orange)]()
[![Status](https://img.shields.io/badge/Audit-100%25%20Verified-brightgreen)]()

---

## 🌟 Overview

The **Ganesh Institute of Technology** web platform is a modern, responsive, and accessible institutional portal designed to serve prospective students, enrolled undergraduates, faculty, alumni, and recruiters.

It combines a public website with an **Interactive Student Self-Service Portal** and a **Super-Admin Management Console** with reactive client-side storage (`localStorage` and `sessionStorage`).

---

## 🚀 Key Features

### 1. 🔍 Instant Global Site Search
- Accessible from the site header on all pages or via keyboard shortcut **`Ctrl + K`** (or `/`).
- Real-time search across 8 academic departments, course curricula, faculty directories, digital library resources, circulars, clubs, and examination date sheets.

### 2. 🗺️ Interactive Campus Map & Virtual Guide (`campus-map.html`)
- Interactive SVG-rendered 45-acre campus layout.
- Clickable building zones:
  - **Administrative Block:** Principal, Registrar, Controller of Examinations (COE), Admissions.
  - **Tech Block A:** Computer Science (CSE), AI & Machine Learning, Data Science.
  - **Tech Block B:** Electronics & Communication (ECE), Electrical & Electronics (EEE), VLSI Suites.
  - **Workshops & Core Engg:** Mechanical CAD/CAM, Robotics, Civil UTM Labs.
  - **Central Digital Library:** 45,000+ volumes, 50-terminal e-learning lab, research cubicles.
  - **Sports Arena & Residences:** Hostels, dining complex, athletics ground.
- Interactive category filtering (Academics, Admin, Amenities, Sports).

### 3. 🔐 Student Self-Service Portal (`student-portal.html`)
- Secure login gateway supporting demo IDs `GI001` - `GI005` or 1-click **Quick Demo Select**.
- Dynamic tabbed dashboard:
  - **Academic Overview:** Real-time attendance gauge, CGPA meter, semester credits, fee status badge, advisor contact.
  - **Subject-Wise Attendance:** Detailed lecture & lab attendance table with percentage status (Safe vs. Shortage alert < 75%) and leave application simulator.
  - **Internal Assessment (CIE):** Mid-1, Mid-2, assignment scores, and performance grades.
  - **Weekly Timetable:** Period schedule (09:00 AM - 04:30 PM) with classroom and faculty allocations.
  - **Fee Records & Payments:** Tuition, lab, and examination fee breakup, online payment simulator to clear dues, and printable official receipt.
  - **Digital Hall Ticket:** Examination date sheet, registration details, barcode, and print/download view.
- Persistent session across all standalone service pages (`attendance.html`, `internal-marks.html`, `timetable.html`, `fees.html`, `library.html`).

### 4. 🛡️ Admin Management Console (`admin-portal.html`)
- **Institution KPI Cards:** Real-time enrolled students count, average campus attendance %, active notices, and placement rates.
- **Student Management (CRUD):** Live search and department filter, enroll new students, edit attendance/CGPA/fees, delete records.
- **Notice & Circulars Publisher:** Post new bulletins (Title, Category, Priority Tag) that update the public website ticker and news archives immediately.
- **Events Scheduler:** Schedule campus hackathons, symposiums, and sports championships with live attendee tracking.
- **Review Moderation:** Approve or delete incoming student and alumni reviews.
- **Data Export & Factory Reset:** Export complete institutional data as structured JSON or restore default demo data.

### 5. 📚 Central Digital Library (`library.html`)
- Searchable catalogue of engineering textbooks, reference manuals, IEEE journals, and previous year question papers (PYQs).
- Category and department filters with instant view/download simulation.

### 6. 💼 Training & Placements Hub (`placements.html`)
- Comprehensive recruitment metrics: **86.4% placed**, **₹8.4 LPA highest CTC**, **₹4.8 LPA average CTC**, **62+ recruiting companies**, **450+ total offers**.
- Department-wise placement breakdown and interactive recruiter directory (TCS, Infosys, Wipro, Accenture, Deloitte, Qualcomm, Amazon).
- Campus Recruitment Training (CRT) 4-semester curriculum modules.

### 7. 🎓 8 Undergraduate B.Tech Departments
- All departments feature complete dedicated pages:
  - [Computer Science & Engineering (CSE)](department-cse.html)
  - [CSE — Artificial Intelligence & Machine Learning](department-ai-ml.html)
  - [Artificial Intelligence & Data Science (AI & DS)](department-ai-ds.html)
  - [Electronics & Communication Engineering (ECE)](department-ece.html)
  - [Electrical & Electronics Engineering (EEE)](department-eee.html)
  - [Mechanical Engineering (ME)](department-me.html)
  - [Civil Engineering](department-civil.html)
  - [Humanities & Basic Sciences (H&S)](department-hs.html)
- Includes the full [B.Tech ECE Syllabus & Curriculum](syllabus-ece.html) course scheme.

### 8. 💻 Dynamic Student Life & Technical Clubs
- Dedicated pages for [CoderClub](coderclub.html), [CIE Innovation Hub](cie-club.html), [CAD Forum](cad-forum.html), [English Club](english-club.html), and [Training & Placement Club](training-placement-club.html).
- Interactive "Join Club" membership modal.

### 9. ⭐ Community Feedback & Verified Reviews (`reviews.html`)
- Star rating system and verified alumni/student testimonials.
- Interactive review submission modal.

---

## 🔑 Demo Credentials

| Role | Username / ID | Password | Access Highlights |
| :--- | :--- | :--- | :--- |
| **Student** | `GI001` (or `GI002` - `GI005`) | Any password (e.g. `demo123`) | Attendance, CIE Marks, Timetable, Fees, Hall Ticket |
| **Admin** | `admin` | `admin123` | Student CRUD, Publish Notices, Events, Moderation |

*Tip: You can also select any student directly from the "Quick Demo Login" dropdown on the student login screen.*

---

## 📁 Project Structure

```
collegewebsite/
├── index.html                   # Fast redirect entry point
├── home.html                    # Modern institute homepage with hero, ticker & stats
├── profile.html                 # About institute, vision, mission & leadership
├── college-details.html         # Campus infrastructure, facilities & green initiatives
├── campus-map.html              # Interactive SVG campus map & floor guides
├── departments.html             # Academic departments directory
│   ├── department-cse.html      # Computer Science & Engineering
│   ├── department-ai-ml.html    # CSE (AI & Machine Learning)
│   ├── department-ai-ds.html    # AI & Data Science
│   ├── department-ece.html      # Electronics & Communication Engineering
│   ├── department-eee.html      # Electrical & Electronics Engineering
│   ├── department-me.html       # Mechanical Engineering
│   ├── department-civil.html    # Civil Engineering
│   ├── department-hs.html       # Humanities & Basic Sciences
│   └── syllabus-ece.html        # Detailed B.Tech ECE Syllabus & Curriculum
├── student-portal.html          # Student authentication & 6-tab dashboard
├── admin-portal.html            # Admin management console with CRUD & publisher
├── attendance.html              # Standalone subject-wise attendance tracker
├── internal-marks.html          # Continuous internal evaluation (CIE) marks
├── timetable.html               # Weekly class schedule & lab batches
├── fees.html                    # Fee status, payment simulator & receipt generator
├── library.html                 # Central digital library catalogue & e-resources
├── examinations.html            # Examination cell, grading rules & circulars
├── exam-schedule.html           # Semester end exam date sheets & timetable
├── exam-notices.html            # Official examination bulletins & deadlines
├── placements.html              # Placement statistics, recruiters & CRT training
├── top-performers.html          # Hall of Fame, gold medalists & hackathon winners
├── news.html                    # Campus circulars & announcements archive
├── events.html                  # Campus events calendar & registration modal
├── reviews.html                 # Student/alumni feedback & submission form
├── student-life.html            # Student clubs, NSS & sports overview
│   ├── coderclub.html           # CoderClub programming community
│   ├── cie-club.html            # CIE innovation & startup incubator
│   ├── cad-forum.html           # CAD Forum 3D modeling & fabrication
│   ├── english-club.html        # English Club & Toastmasters
│   └── training-placement-club.html # TPC interview & aptitude circles
├── 404.html                     # Custom 404 error page for GitHub Pages
├── styles.css                   # Cohesive design tokens, layout & responsive CSS
├── department-page.css          # Department & profile layout stylesheet
├── student-portal.css           # Portal & dashboard styles (tabs, tables, cards)
├── script.js                    # Mobile nav, active link highlight & search modal
├── student-data.js              # Unified data store & localStorage persistence
├── student-portal.js            # Student portal client logic
├── admin-portal.js              # Admin portal management client logic
└── assets/
    ├── college-building.svg     # Campus illustration / photograph
    └── ganesha-logo.svg         # Official college emblem
```

---

## 💻 Local Development & Testing

1. Clone or download this repository:
   ```bash
   git clone https://github.com/lsvsaravananganesh-bit/collegewebsite.git
   ```
2. Start the local development server (zero dependencies required):
   ```bash
   npm run dev
   # or
   npm start
   ```
   *This automatically launches the server on `http://localhost:3000` and opens your default browser.*

3. Alternatively, you can run using Python 3 or open directly:
   ```bash
   # Using Python 3:
   python -m http.server 8000
   ```
   Or simply double-click `home.html` in your file explorer.

---

## 🌐 GitHub Pages Deployment Guide

To deploy this website through **GitHub Pages**:

1. Go to your repository settings on GitHub:  
   `https://github.com/lsvsaravananganesh-bit/collegewebsite/settings`
2. Scroll to the **Pages** section on the left sidebar.
3. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
4. Click **Save**.
5. GitHub Pages will build and deploy your site in ~1 minute at:  
   **`https://lsvsaravananganesh-bit.github.io/collegewebsite/`**

---

## 📝 License & Contact

- **Institution:** Ganesh Institute of Technology (GIT)
- **Location:** Kurnool, Andhra Pradesh, India
- **Phone:** +91 9963623910
- **Email:** `lsvsaravananganesh@gmail.com`
- **Copyright:** © 2026 Ganesh Institute of Technology. All rights reserved.
