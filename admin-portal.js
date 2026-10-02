// Ganesh Institute of Technology - Admin Management Logic

document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('adminLoginScreen');
  const dashboardScreen = document.getElementById('adminDashboardScreen');
  const loginForm = document.getElementById('adminLoginForm');
  const usernameInput = document.getElementById('adminUsername');
  const passwordInput = document.getElementById('adminPassword');
  const errorMsg = document.getElementById('adminErrorMsg');
  const logoutBtn = document.getElementById('adminLogoutBtn');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  // Check active admin session
  if (getAdminSession()) {
    showAdminDashboard();
  }

  // Admin login handler
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = usernameInput.value.trim();
      const pass = passwordInput.value.trim();

      if (user === 'admin' && pass === 'admin123') {
        errorMsg.style.display = 'none';
        setAdminSession(true);
        showAdminDashboard();
      } else {
        errorMsg.textContent = 'Invalid administrator credentials. Use admin / admin123.';
        errorMsg.style.display = 'block';
      }
    });
  }

  // Admin logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      setAdminSession(false);
      dashboardScreen.style.display = 'none';
      loginScreen.style.display = 'flex';
      loginForm.reset();
    });
  }

  // Tab switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      document.getElementById(targetId)?.classList.add('active');
    });
  });

  function showAdminDashboard() {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';
    renderKPIs();
    renderStudentTable();
    renderNoticesTable();
    renderEventsTable();
    renderReviewsTable();
  }

  // KPI Calculations
  function renderKPIs() {
    const students = getStoredStudents();
    const notices = getStoredNotices();

    document.getElementById('kpiTotalStudents').textContent = students.length;
    document.getElementById('kpiNoticesCount').textContent = notices.length;

    if (students.length > 0) {
      const totalAtt = students.reduce((acc, s) => acc + (Number(s.attendance) || 0), 0);
      const avg = (totalAtt / students.length).toFixed(1);
      document.getElementById('kpiAvgAttendance').textContent = avg + '%';
    }
  }

  // Student CRUD Table
  const searchFilter = document.getElementById('studentSearchFilter');
  const deptFilter = document.getElementById('studentDeptFilter');

  if (searchFilter) searchFilter.addEventListener('input', renderStudentTable);
  if (deptFilter) deptFilter.addEventListener('change', renderStudentTable);

  function renderStudentTable() {
    const tbody = document.getElementById('adminStudentTbody');
    if (!tbody) return;

    let students = getStoredStudents();
    const query = (searchFilter ? searchFilter.value : '').toLowerCase().trim();
    const dept = (deptFilter ? deptFilter.value : '').trim();

    if (query) {
      students = students.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.id.toLowerCase().includes(query) ||
        (s.department && s.department.toLowerCase().includes(query))
      );
    }

    if (dept) {
      students = students.filter(s => s.department === dept);
    }

    if (students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--muted)">No student records match current search filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = students.map(s => `
      <tr>
        <td><b>${s.id}</b></td>
        <td>${s.name}</td>
        <td><span class="badge info">${s.department}</span></td>
        <td>${s.year} Year (${s.section})</td>
        <td>
          <span class="status-pill ${s.attendance >= 75 ? 'safe' : 'danger'}">
            ${s.attendance}%
          </span>
        </td>
        <td><b>${s.cgpa}</b></td>
        <td>
          <span class="status-pill ${s.feeStatus === 'Paid' ? 'safe' : 'warning'}">
            ${s.feeStatus}
          </span>
        </td>
        <td>
          <button class="action-icon-btn edit-student" data-id="${s.id}">✏️ Edit</button>
          <button class="action-icon-btn danger delete-student" data-id="${s.id}">🗑️</button>
        </td>
      </tr>
    `).join('');

    // Attach event listeners
    tbody.querySelectorAll('.edit-student').forEach(btn => {
      btn.addEventListener('click', () => openEditStudentModal(btn.dataset.id));
    });

    tbody.querySelectorAll('.delete-student').forEach(btn => {
      btn.addEventListener('click', () => deleteStudent(btn.dataset.id));
    });
  }

  // Student Modal Logic
  const modal = document.getElementById('studentModal');
  const addStudentBtn = document.getElementById('addStudentBtn');
  const closeModalBtn = document.getElementById('closeStudentModal');
  const cancelModalBtn = document.getElementById('cancelStudentModal');
  const studentModalForm = document.getElementById('studentModalForm');

  if (addStudentBtn) {
    addStudentBtn.addEventListener('click', () => {
      document.getElementById('modalStudentTitle').textContent = 'Enroll New Student';
      document.getElementById('editOriginalId').value = '';
      studentModalForm.reset();
      modal.classList.add('active');
    });
  }

  function openEditStudentModal(id) {
    const student = findStudent(id);
    if (!student) return;

    document.getElementById('modalStudentTitle').textContent = `Edit Student: ${student.name}`;
    document.getElementById('editOriginalId').value = student.id;
    document.getElementById('mStudentId').value = student.id;
    document.getElementById('mStudentName').value = student.name;
    document.getElementById('mStudentDept').value = student.department;
    document.getElementById('mStudentYearSec').value = `${student.year} - ${student.section}`;
    document.getElementById('mStudentAttnd').value = student.attendance;
    document.getElementById('mStudentCgpa').value = student.cgpa;
    document.getElementById('mStudentFee').value = student.feeStatus;
    document.getElementById('mStudentEmail').value = student.email;

    modal.classList.add('active');
  }

  function closeModal() {
    modal.classList.remove('active');
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);

  if (studentModalForm) {
    studentModalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const origId = document.getElementById('editOriginalId').value;
      const id = document.getElementById('mStudentId').value.trim();
      const name = document.getElementById('mStudentName').value.trim();
      const dept = document.getElementById('mStudentDept').value;
      const yearSec = document.getElementById('mStudentYearSec').value.trim().split('-');
      const year = (yearSec[0] || 'III').trim();
      const section = (yearSec[1] || 'A').trim();
      const attnd = Number(document.getElementById('mStudentAttnd').value);
      const cgpa = Number(document.getElementById('mStudentCgpa').value);
      const fee = document.getElementById('mStudentFee').value;
      const email = document.getElementById('mStudentEmail').value.trim();

      const all = getStoredStudents();

      if (origId) {
        // Edit
        const idx = all.findIndex(s => s.id === origId);
        if (idx >= 0) {
          all[idx] = {
            ...all[idx],
            id, name, department: dept, year, section, attendance: attnd, cgpa, feeStatus: fee, email
          };
        }
      } else {
        // Add
        const newStudent = {
          id,
          rollNo: '24GI0' + (all.length + 100),
          name,
          department: dept,
          deptFullName: dept + ' Engineering',
          year,
          semester: 'V',
          section,
          email,
          phone: '+91 99636 23910',
          attendance: attnd,
          cgpa,
          feeStatus: fee,
          totalFees: 65000,
          paidFees: fee === 'Paid' ? 65000 : 40000,
          dueFees: fee === 'Paid' ? 0 : 25000
        };
        all.push(newStudent);
      }

      saveStudents(all);
      closeModal();
      renderKPIs();
      renderStudentTable();
      alert('Student record successfully saved!');
    });
  }

  function deleteStudent(id) {
    if (confirm(`Are you sure you want to delete student ${id}? This action cannot be undone.`)) {
      let all = getStoredStudents();
      all = all.filter(s => s.id !== id);
      saveStudents(all);
      renderKPIs();
      renderStudentTable();
    }
  }

  // Notices Management
  const newNoticeForm = document.getElementById('newNoticeForm');
  if (newNoticeForm) {
    newNoticeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('noticeTitleInput').value.trim();
      const cat = document.getElementById('noticeCategoryInput').value;
      const badge = document.getElementById('noticeBadgeInput').value;

      const notices = getStoredNotices();
      const newNotice = {
        id: Date.now(),
        title,
        category: cat,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        badge,
        link: cat === 'Examinations' ? 'exam-schedule.html' : cat === 'Placements' ? 'placements.html' : 'news.html'
      };

      notices.unshift(newNotice);
      saveNotices(notices);
      newNoticeForm.reset();
      renderKPIs();
      renderNoticesTable();
      alert('Notice published live to campus ticker and news portal!');
    });
  }

  function renderNoticesTable() {
    const tbody = document.getElementById('adminNoticesTbody');
    if (!tbody) return;

    const notices = getStoredNotices();
    tbody.innerHTML = notices.map(n => `
      <tr>
        <td><b>${n.title}</b></td>
        <td><span class="badge info">${n.category}</span></td>
        <td><span class="status-pill ${n.badge === 'High Priority' ? 'danger' : 'safe'}">${n.badge}</span></td>
        <td>${n.date}</td>
        <td>
          <button class="action-icon-btn danger delete-notice" data-id="${n.id}">Delete</button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.delete-notice').forEach(btn => {
      btn.addEventListener('click', () => {
        let nList = getStoredNotices();
        nList = nList.filter(item => String(item.id) !== String(btn.dataset.id));
        saveNotices(nList);
        renderKPIs();
        renderNoticesTable();
      });
    });
  }

  // Events Management
  const newEventForm = document.getElementById('newEventForm');
  if (newEventForm) {
    newEventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('eventTitleInput').value.trim();
      const cat = document.getElementById('eventCatInput').value;
      const date = document.getElementById('eventDateInput').value.trim();
      const venue = document.getElementById('eventVenueInput').value.trim();
      const org = document.getElementById('eventOrgInput').value.trim();

      const events = getStoredEvents();
      events.push({
        id: Date.now(),
        title, category: cat, date, venue, organizer: org, registered: 0
      });

      saveEvents(events);
      newEventForm.reset();
      renderEventsTable();
      alert('Event scheduled successfully on college calendar!');
    });
  }

  function renderEventsTable() {
    const tbody = document.getElementById('adminEventsTbody');
    if (!tbody) return;

    const events = getStoredEvents();
    tbody.innerHTML = events.map(ev => `
      <tr>
        <td><b>${ev.title}</b></td>
        <td><span class="badge info">${ev.category}</span></td>
        <td>${ev.date}</td>
        <td>${ev.venue}</td>
        <td><b>${ev.registered || 0}</b> registered</td>
        <td>
          <button class="action-icon-btn danger delete-event" data-id="${ev.id}">Cancel</button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.delete-event').forEach(btn => {
      btn.addEventListener('click', () => {
        let evList = getStoredEvents();
        evList = evList.filter(item => String(item.id) !== String(btn.dataset.id));
        saveEvents(evList);
        renderEventsTable();
      });
    });
  }

  // Review Moderation
  function renderReviewsTable() {
    const tbody = document.getElementById('adminReviewsTbody');
    if (!tbody) return;

    const reviews = getStoredReviews();
    tbody.innerHTML = reviews.map(r => `
      <tr>
        <td><b>${r.name}</b></td>
        <td>${r.role}</td>
        <td>${'⭐'.repeat(r.rating || 5)}</td>
        <td><span class="badge info">${r.category}</span></td>
        <td style="max-width:280px;font-size:12.5px">${r.text}</td>
        <td>
          <button class="action-icon-btn danger delete-review" data-id="${r.id}">Delete</button>
        </td>
      </tr>
    `).join('');

    tbody.querySelectorAll('.delete-review').forEach(btn => {
      btn.addEventListener('click', () => {
        let rList = getStoredReviews();
        rList = rList.filter(item => String(item.id) !== String(btn.dataset.id));
        saveReviews(rList);
        renderReviewsTable();
      });
    });
  }

  // Backup & Reset Actions
  document.getElementById('exportJsonBtn')?.addEventListener('click', () => {
    const data = {
      students: getStoredStudents(),
      notices: getStoredNotices(),
      events: getStoredEvents(),
      reviews: getStoredReviews(),
      exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GIT-Portal-Export-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('resetDataBtn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all data to default factory demo records? This will clear custom modifications.')) {
      localStorage.removeItem('git_students');
      localStorage.removeItem('git_notices');
      localStorage.removeItem('git_events');
      localStorage.removeItem('git_reviews');
      alert('Data reset successfully! Reloading...');
      window.location.reload();
    }
  });

});
