// Ganesh Institute of Technology - Student Portal Client Logic

document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('loginScreen');
  const dashboardScreen = document.getElementById('dashboardScreen');
  const loginForm = document.getElementById('studentLoginForm');
  const idInput = document.getElementById('studentIdInput');
  const quickSelect = document.getElementById('demoQuickSelect');
  const errorMsg = document.getElementById('errorMsg');
  const logoutBtn = document.getElementById('studentLogoutBtn');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  // Check existing session
  const activeStudent = getStudentSession();
  if (activeStudent) {
    showDashboard(activeStudent);
  }

  // Quick Demo Dropdown handler
  if (quickSelect) {
    quickSelect.addEventListener('change', () => {
      const selectedId = quickSelect.value;
      if (selectedId) {
        idInput.value = selectedId;
        const student = findStudent(selectedId);
        if (student) {
          authenticateStudent(student);
        }
      }
    });
  }

  // Form submit handler
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputVal = idInput.value.trim();
      const student = findStudent(inputVal);

      if (!student) {
        showError(`Student ID "${inputVal}" was not found. Please try GI001 through GI005 (or GP001-GP005).`);
        return;
      }

      authenticateStudent(student);
    });
  }

  function authenticateStudent(student) {
    errorMsg.style.display = 'none';
    setStudentSession(student);
    showDashboard(student);
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.style.display = 'block';
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

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearStudentSession();
      dashboardScreen.style.display = 'none';
      loginScreen.style.display = 'flex';
      loginForm.reset();
      if (quickSelect) quickSelect.value = '';
    });
  }

  // Render Dashboard
  function showDashboard(s) {
    loginScreen.style.display = 'none';
    dashboardScreen.style.display = 'block';

    // Avatar initials
    const initials = s.name.split(' ').map(n => n[0]).join('').substring(0, 2);
    document.getElementById('dashAvatar').textContent = initials;
    document.getElementById('dashName').textContent = s.name;
    document.getElementById('dashSubInfo').textContent = `Roll No: ${s.rollNo || s.id}  |  B.Tech ${s.department} (${s.year} Year, Sem ${s.semester || 'VI'}, Sec ${s.section})`;
    document.getElementById('dashEmail').textContent = `${s.email}  |  Mentor: ${s.mentor || 'Assigned Faculty Mentor'}`;

    // Overview Tab
    document.getElementById('cardAttendance').textContent = s.attendance + '%';
    const attStatus = document.getElementById('cardAttendanceStatus');
    if (s.attendance >= 75) {
      attStatus.textContent = 'Status: Satisfactory (≥75%)';
      attStatus.className = 'status-pill safe';
    } else {
      attStatus.textContent = 'Status: Shortage Warning (<75%)';
      attStatus.className = 'status-pill danger';
    }

    document.getElementById('cardCgpa').textContent = s.cgpa;
    document.getElementById('cardFee').textContent = s.feeStatus;
    const feeSub = document.getElementById('cardFeeSub');
    if (s.dueFees > 0) {
      feeSub.textContent = `Pending balance: ₹${s.dueFees.toLocaleString()}`;
      feeSub.style.color = 'var(--danger)';
    } else {
      feeSub.textContent = 'No outstanding dues';
      feeSub.style.color = 'var(--success)';
    }

    // Profile Box
    document.getElementById('pName').textContent = s.name;
    document.getElementById('pId').textContent = s.id;
    document.getElementById('pDept').textContent = s.deptFullName || s.department;
    document.getElementById('pYearSem').textContent = `${s.year} Year / Semester ${s.semester || 'VI'}`;
    document.getElementById('pSection').textContent = `Section ${s.section}`;
    document.getElementById('pEmail').textContent = s.email;
    document.getElementById('pPhone').textContent = s.phone || '+91 99636 23910';
    document.getElementById('pMentor').textContent = s.mentor || 'Dr. Department Faculty Advisor';

    // Attendance Table
    const attTbody = document.getElementById('attendanceTableBody');
    if (attTbody) {
      const list = s.attendanceDetails || [
        { code: s.department + '601', subject: 'Core Engineering Course 1', attended: 42, total: 46, percent: 91, faculty: 'Prof. Faculty' },
        { code: s.department + '602', subject: 'Core Engineering Course 2', attended: 38, total: 44, percent: 86, faculty: 'Dr. Advisor' },
        { code: s.department + '603', subject: 'Professional Elective', attended: 39, total: 45, percent: 87, faculty: 'Prof. Specialist' },
        { code: s.department + '604', subject: 'Practical Laboratory', attended: 19, total: 20, percent: 95, faculty: 'Lab Incharge' }
      ];

      attTbody.innerHTML = list.map(item => `
        <tr>
          <td><b>${item.code}</b></td>
          <td>${item.subject}</td>
          <td>${item.faculty}</td>
          <td>${item.attended}</td>
          <td>${item.total}</td>
          <td><b>${item.percent}%</b></td>
          <td><span class="status-pill ${item.percent >= 75 ? 'safe' : 'danger'}">${item.percent >= 75 ? 'Regular' : 'Shortage'}</span></td>
        </tr>
      `).join('');
    }

    // Internal Marks Table
    const marksTbody = document.getElementById('marksTableBody');
    if (marksTbody) {
      const marksList = s.internalMarks || [
        { code: s.department + '601', subject: 'Core Course 1', mid1: 27, mid2: 28, assign: 10, total: 38, max: 40 },
        { code: s.department + '602', subject: 'Core Course 2', mid1: 26, mid2: 27, assign: 9, total: 36, max: 40 },
        { code: s.department + '603', subject: 'Professional Elective', mid1: 28, mid2: 29, assign: 10, total: 39, max: 40 },
        { code: s.department + '604', subject: 'Practical Lab', mid1: 39, mid2: 40, assign: 10, total: 49, max: 50 }
      ];

      marksTbody.innerHTML = marksList.map(m => {
        const grade = m.total >= 36 ? 'A+ (Outstanding)' : m.total >= 30 ? 'A (Excellent)' : 'B (Good)';
        return `
          <tr>
            <td><b>${m.code}</b></td>
            <td>${m.subject}</td>
            <td>${m.mid1}</td>
            <td>${m.mid2}</td>
            <td>${m.assign}</td>
            <td><b>${m.total} / ${m.max}</b></td>
            <td><span class="status-pill safe">${grade}</span></td>
          </tr>
        `;
      }).join('');
    }

    // Timetable
    const ttTbody = document.getElementById('timetableBody');
    if (ttTbody && s.timetable) {
      ttTbody.innerHTML = s.timetable.map(row => `
        <tr>
          <td class="time-col">${row.time}</td>
          <td>${row.mon}</td>
          <td>${row.tue}</td>
          <td>${row.wed}</td>
          <td>${row.thu}</td>
          <td>${row.fri}</td>
        </tr>
      `).join('');
    }

    // Fee Details
    const feeTotal = s.totalFees || 65000;
    const feePaid = s.paidFees || (s.feeStatus === 'Paid' ? feeTotal : feeTotal - 20000);
    const feeDue = s.dueFees !== undefined ? s.dueFees : (feeTotal - feePaid);

    document.getElementById('feeTotal').textContent = `₹${feeTotal.toLocaleString()}`;
    document.getElementById('feePaid').textContent = `₹${feePaid.toLocaleString()}`;
    document.getElementById('feeDue').textContent = `₹${feeDue.toLocaleString()}`;

    const feeDueBadge = document.getElementById('feeDueBadge');
    const payFeeBtn = document.getElementById('payFeeBtn');

    if (feeDue > 0) {
      feeDueBadge.textContent = 'Pending Payment';
      feeDueBadge.className = 'status-pill danger';
      if (payFeeBtn) {
        payFeeBtn.style.display = 'inline-flex';
        payFeeBtn.onclick = () => {
          if (confirm(`Simulate online payment of ₹${feeDue.toLocaleString()} via College Fee Gateway?`)) {
            s.feeStatus = 'Paid';
            s.paidFees = feeTotal;
            s.dueFees = 0;
            setStudentSession(s);
            
            // update in stored students
            const all = getStoredStudents();
            const idx = all.findIndex(st => normalizeStudentId(st.id) === normalizeStudentId(s.id));
            if (idx >= 0) {
              all[idx] = s;
              saveStudents(all);
            }
            alert('Payment Successful! Receipt generated and fee status updated to Paid.');
            showDashboard(s);
          }
        };
      }
    } else {
      feeDueBadge.textContent = 'No Dues · Cleared';
      feeDueBadge.className = 'status-pill safe';
      if (payFeeBtn) payFeeBtn.style.display = 'none';
    }

    // Print Receipt
    document.getElementById('printReceiptBtn').onclick = () => {
      const receiptWindow = window.open('', '_blank');
      receiptWindow.document.write(`
        <html>
        <head>
          <title>Fee Receipt - ${s.name}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #12304a; }
            .header { text-align: center; border-bottom: 2px solid #12304a; padding-bottom: 12px; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 10px; text-align: left; }
            th { background: #f0f4f7; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>GANESH INSTITUTE OF TECHNOLOGY</h2>
            <p>Official Academic Fee Receipt · Academic Year 2026-27</p>
          </div>
          <p><b>Receipt No:</b> GIT-REC-2026-${s.id} &nbsp;|&nbsp; <b>Date:</b> ${new Date().toLocaleDateString()}</p>
          <p><b>Student Name:</b> ${s.name} &nbsp;|&nbsp; <b>ID / Roll:</b> ${s.id}</p>
          <p><b>Program:</b> B.Tech in ${s.deptFullName || s.department} (${s.year} Year)</p>
          <table>
            <thead><tr><th>Fee Component</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>Tuition & Academic Training Fee</td><td>₹50,000</td><td>Paid</td></tr>
              <tr><td>Laboratory & Computing Complex Fee</td><td>₹10,000</td><td>Paid</td></tr>
              <tr><td>Central Digital Library & Sports Fee</td><td>₹5,000</td><td>Paid</td></tr>
              <tr><th>Total Fee Amount</th><th>₹${feeTotal.toLocaleString()}</th><th>${s.feeStatus}</th></tr>
            </tbody>
          </table>
          <p style="margin-top: 40px; text-align: right;"><b>Authorized Finance Officer</b><br>Ganesh Institute of Technology</p>
          <script>window.print();<\/script>
        </body>
        </html>
      `);
      receiptWindow.document.close();
    };

    // Hall Ticket Data
    document.getElementById('htName').textContent = s.name;
    document.getElementById('htRoll').textContent = s.rollNo || s.id;
    document.getElementById('htBranch').textContent = `B.Tech ${s.department} — Semester ${s.semester || 'VI'}`;
  }
});