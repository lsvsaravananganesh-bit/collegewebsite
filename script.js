// Ganesh Institute of Technology - Unified Main Client Script
// Provides responsive navigation, global search modal, dynamic notices, and authentication state.

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initActiveNav();
  initGlobalSearch();
  initHeaderAuth();
  initAnnouncementTicker();
});

// Mobile Navigation Toggle
function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 650) {
          navLinks.classList.remove('open');
          toggle.textContent = '☰';
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

// Active Nav Item Highlighter
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'home.html';
  const navAnchors = document.querySelectorAll('.nav-links a');
  navAnchors.forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    const cleanHref = href.split('#')[0];
    if (cleanHref === currentPath || (currentPath === '' && cleanHref === 'home.html') || (currentPath === 'index.html' && cleanHref === 'home.html')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

// Global Site Search Index & Modal
const SEARCH_INDEX = [
  { title: 'Computer Science & Engineering (CSE)', category: 'Department', desc: 'Software engineering, algorithms, AI and digital systems.', url: 'department-cse.html' },
  { title: 'CSE — Artificial Intelligence & Machine Learning', category: 'Department', desc: 'Machine learning, deep learning and neural networks.', url: 'department-ai-ml.html' },
  { title: 'Artificial Intelligence & Data Science (AI & DS)', category: 'Department', desc: 'Big data analytics, statistics and intelligent systems.', url: 'department-ai-ds.html' },
  { title: 'Electronics & Communication Engineering (ECE)', category: 'Department', desc: 'VLSI design, embedded systems, microprocessors and IoT.', url: 'department-ece.html' },
  { title: 'B.Tech ECE Syllabus & Curriculum', category: 'Academics', desc: 'Complete 4-year course scheme, credits, and syllabus modules.', url: 'syllabus-ece.html' },
  { title: 'Electrical & Electronics Engineering (EEE)', category: 'Department', desc: 'Power systems, smart grids, electrical machines and drives.', url: 'department-eee.html' },
  { title: 'Mechanical Engineering (ME)', category: 'Department', desc: 'Robotics, automation, thermal engineering, CAD/CAM.', url: 'department-me.html' },
  { title: 'Civil Engineering (CE)', category: 'Department', desc: 'Structural analysis, smart infrastructure and GIS.', url: 'department-civil.html' },
  { title: 'Humanities & Basic Sciences (H&S)', category: 'Department', desc: 'Engineering mathematics, physics, chemistry and soft skills.', url: 'department-hs.html' },
  { title: 'Student Portal & Academic Dashboard', category: 'Portal', desc: 'Login for student attendance, internal marks, timetable & fees.', url: 'student-portal.html' },
  { title: 'Admin Management Portal', category: 'Portal', desc: 'Institutional dashboard for student records, notices and events.', url: 'admin-portal.html' },
  { title: 'Subject-wise Attendance Tracker', category: 'Student Service', desc: 'Attendance percentages, shortage alerts and lecture records.', url: 'attendance.html' },
  { title: 'Internal Marks & Assessments', category: 'Student Service', desc: 'Mid examinations, continuous internal marks and lab grades.', url: 'internal-marks.html' },
  { title: 'Class Timetables & Schedules', category: 'Student Service', desc: 'Weekly department and semester class timetables.', url: 'timetable.html' },
  { title: 'Fee Details & Online Receipts', category: 'Student Service', desc: 'Tuition and academic fee status and printable receipts.', url: 'fees.html' },
  { title: 'Digital Library & E-Learning', category: 'Library', desc: 'Search textbooks, journals, lecture notes and question papers.', url: 'library.html' },
  { title: 'Campus Map & Interactive Guide', category: 'Campus', desc: 'Explore academic blocks, labs, library, auditoriums and sports arena.', url: 'campus-map.html' },
  { title: 'Examinations & Hall Tickets', category: 'Examinations', desc: 'Semester end exams, timetable schedules, circulars and guidelines.', url: 'examinations.html' },
  { title: 'Exam Timetables & Date Sheets', category: 'Examinations', desc: 'Upcoming semester examination dates and session schedules.', url: 'exam-schedule.html' },
  { title: 'Exam Notices & Circulars', category: 'Examinations', desc: 'Official examination notifications, deadlines and fee dates.', url: 'exam-notices.html' },
  { title: 'Training & Placements Hub', category: 'Careers', desc: 'Campus recruitment statistics, top recruiters and eligibility.', url: 'placements.html' },
  { title: 'Campus Events & Technical Fests', category: 'Events', desc: 'Hackathons, symposiums, workshops and cultural festivals.', url: 'events.html' },
  { title: 'Student Life & Technical Clubs', category: 'Clubs', desc: 'CoderClub, English Club, CAD Forum, CIE Club and activities.', url: 'student-life.html' },
  { title: 'CoderClub — Technical Coding Club', category: 'Clubs', desc: 'Competitive programming, web development and hackathons.', url: 'coderclub.html' },
  { title: 'English Club — Communication & Toastmasters', category: 'Clubs', desc: 'Public speaking, debate, interview skills and group discussions.', url: 'english-club.html' },
  { title: 'CAD Forum — Design & Modeling', category: 'Clubs', desc: 'SolidWorks, AutoCAD, 3D printing and structural modeling.', url: 'cad-forum.html' },
  { title: 'CIE Club — Innovation & Entrepreneurship', category: 'Clubs', desc: 'Startup incubation, prototype funding and investor pitches.', url: 'cie-club.html' },
  { title: 'Training & Placement Club (TPC)', category: 'Clubs', desc: 'Aptitude training, mock interviews and career readiness.', url: 'training-placement-club.html' },
  { title: 'Top Performers & Hall of Fame', category: 'Achievements', desc: 'University toppers, department ranks and national hackathon winners.', url: 'top-performers.html' },
  { title: 'Campus News & Announcements', category: 'News', desc: 'Official notifications, admissions and campus circulars.', url: 'news.html' },
  { title: 'Student & Alumni Reviews', category: 'Testimonials', desc: 'Verified reviews and feedback from students and alumni.', url: 'reviews.html' },
  { title: 'Institute Profile & Vision', category: 'About', desc: 'Foundational history, leadership, vision, mission and accreditations.', url: 'profile.html' },
  { title: 'College Details & Infrastructure', category: 'About', desc: 'Campus facilities, labs, library, campus green initiatives.', url: 'college-details.html' }
];

function initGlobalSearch() {
  // Ensure search modal HTML exists in DOM
  let modal = document.getElementById('searchModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'searchModal';
    modal.className = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Site Search');
    modal.innerHTML = `
      <div class="search-container">
        <div class="search-header">
          <span class="search-icon">🔍</span>
          <input type="search" id="modalSearchInput" placeholder="Search pages, departments, syllabus, portals, exams..." autocomplete="off">
          <button class="search-close-btn" id="modalSearchClose" aria-label="Close search">✕</button>
        </div>
        <div class="search-results-box" id="modalSearchResults">
          <div style="padding:20px;text-align:center;color:var(--muted);font-size:13.5px">Type anything to search departments, courses, exams, clubs, or portals...</div>
        </div>
        <div class="search-footer">
          <span>Press <b>ESC</b> to close</span>
          <span>Tip: Press <b>Ctrl + K</b> anytime</span>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const searchInput = document.getElementById('modalSearchInput');
  const resultsBox = document.getElementById('modalSearchResults');
  const closeBtn = document.getElementById('modalSearchClose');

  function openSearch() {
    modal.classList.add('active');
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeSearch() {
    modal.classList.remove('active');
  }

  // Trigger buttons
  document.querySelectorAll('#headerSearchBtn, .trigger-search-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSearch();
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  // Keyboard shortcut Ctrl+K or '/'
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeSearch();
    }
  });

  // Search input handler
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        resultsBox.innerHTML = '<div style="padding:20px;text-align:center;color:var(--muted);font-size:13.5px">Type anything to search departments, courses, exams, clubs, or portals...</div>';
        return;
      }

      const matches = SEARCH_INDEX.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        resultsBox.innerHTML = `<div style="padding:24px;text-align:center;color:var(--muted);font-size:13.5px">No matches found for "<b>${escapeHTML(q)}</b>". Try searching for "ECE", "Placement", "Attendance", "Syllabus", or "Map".</div>`;
        return;
      }

      resultsBox.innerHTML = matches.map(item => `
        <a class="search-result-item" href="${item.url}">
          <small>${item.category}</small>
          <h4>${highlightMatch(item.title, q)}</h4>
          <p>${highlightMatch(item.desc, q)}</p>
        </a>
      `).join('');
    });
  }
}

function highlightMatch(text, query) {
  if (!query) return escapeHTML(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escapeHTML(text).replace(regex, '<mark style="background:#fff3cd;color:#12304a;font-weight:700;padding:1px 3px;border-radius:2px">$1</mark>');
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

// Authentication badge in top strip / navigation
function initHeaderAuth() {
  const topLinks = document.querySelector('.top-links');
  if (!topLinks) return;

  const student = typeof getStudentSession === 'function' ? getStudentSession() : null;
  const isAdmin = typeof getAdminSession === 'function' ? getAdminSession() : false;

  if (student) {
    const studentBadge = document.createElement('span');
    studentBadge.style.cssText = 'display:inline-flex;align-items:center;gap:8px;';
    studentBadge.innerHTML = `
      <a href="student-portal.html" class="portal-link" style="background:var(--gold);color:var(--primary-dark)">👤 ${escapeHTML(student.name)} (${student.id})</a>
      <a href="javascript:void(0)" id="headerLogoutBtn" style="font-size:11px;color:#fca5a5">Logout</a>
    `;
    topLinks.appendChild(studentBadge);

    document.getElementById('headerLogoutBtn')?.addEventListener('click', () => {
      if (typeof clearStudentSession === 'function') clearStudentSession();
      window.location.reload();
    });
  } else if (isAdmin) {
    const adminBadge = document.createElement('span');
    adminBadge.style.cssText = 'display:inline-flex;align-items:center;gap:8px;';
    adminBadge.innerHTML = `
      <a href="admin-portal.html" class="portal-link" style="background:#fca5a5;color:#881337">🛡️ Admin Console</a>
      <a href="javascript:void(0)" id="headerLogoutBtn" style="font-size:11px;color:#fca5a5">Logout</a>
    `;
    topLinks.appendChild(adminBadge);

    document.getElementById('headerLogoutBtn')?.addEventListener('click', () => {
      if (typeof setAdminSession === 'function') setAdminSession(false);
      window.location.reload();
    });
  }
}

// Announcement ticker population
function initAnnouncementTicker() {
  const ticker = document.querySelector('.announcement-ticker');
  if (!ticker || typeof getStoredNotices !== 'function') return;

  const notices = getStoredNotices();
  if (notices && notices.length > 0) {
    ticker.innerHTML = notices.map(n => `
      <a href="${n.link || 'news.html'}">
        <span class="badge ${n.badge === 'High Priority' ? 'danger' : 'info'}">${n.badge || 'Notice'}</span>
        ${escapeHTML(n.title)}
      </a>
    `).join('');
  }
}
