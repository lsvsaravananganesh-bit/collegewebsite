// Ganesh Institute of Technology - Unified Data Store
// Provides demo data for Students, Admin, Notices, Events, Reviews, and Library Resources.
// Supports localStorage persistence for dynamic updates from Admin & Student portals.

const DEFAULT_STUDENTS = [
  {
    id: 'GI001',
    rollNo: '22GI0401',
    name: 'Rahul Kumar',
    department: 'ECE',
    deptFullName: 'Electronics & Communication Engineering',
    year: 'III',
    semester: 'VI',
    section: 'A',
    email: 'rahul.kumar@college.edu',
    phone: '+91 98765 43210',
    mentor: 'Dr. S. K. Sharma (Prof. ECE)',
    attendance: 87,
    cgpa: 8.2,
    feeStatus: 'Paid',
    totalFees: 65000,
    paidFees: 65000,
    dueFees: 0,
    attendanceDetails: [
      { code: 'EC601', subject: 'Digital Signal Processing', attended: 42, total: 46, percent: 91, faculty: 'Dr. Sharma' },
      { code: 'EC602', subject: 'VLSI Design & Technology', attended: 38, total: 44, percent: 86, faculty: 'Prof. Anitha' },
      { code: 'EC603', subject: 'Embedded Systems & IoT', attended: 40, total: 45, percent: 89, faculty: 'Dr. Venkat' },
      { code: 'EC604', subject: 'Microwave & Optical Comm.', attended: 36, total: 45, percent: 80, faculty: 'Prof. Ramesh' },
      { code: 'EC605', subject: 'VLSI & Embedded Lab', attended: 18, total: 20, percent: 90, faculty: 'Dr. Venkat' }
    ],
    internalMarks: [
      { code: 'EC601', subject: 'Digital Signal Processing', mid1: 27, mid2: 28, assign: 9, total: 37, max: 40 },
      { code: 'EC602', subject: 'VLSI Design & Technology', mid1: 25, mid2: 26, assign: 8, total: 34, max: 40 },
      { code: 'EC603', subject: 'Embedded Systems & IoT', mid1: 28, mid2: 29, assign: 10, total: 39, max: 40 },
      { code: 'EC604', subject: 'Microwave & Optical Comm.', mid1: 24, mid2: 25, assign: 8, total: 33, max: 40 },
      { code: 'EC605', subject: 'VLSI & Embedded Lab', mid1: 38, mid2: 39, assign: 10, total: 48, max: 50 }
    ],
    timetable: [
      { time: '09:00 - 10:00', mon: 'EC601 (DSP)', tue: 'EC602 (VLSI)', wed: 'EC603 (IoT)', thu: 'EC601 (DSP)', fri: 'EC604 (Comm)' },
      { time: '10:00 - 11:00', mon: 'EC602 (VLSI)', tue: 'EC603 (IoT)', wed: 'EC601 (DSP)', thu: 'EC602 (VLSI)', fri: 'EC601 (DSP)' },
      { time: '11:15 - 12:15', mon: 'EC604 (Comm)', tue: 'EC601 (DSP)', wed: 'EC602 (VLSI)', thu: 'EC603 (IoT)', fri: 'EC602 (VLSI)' },
      { time: '12:15 - 01:15', mon: 'Library / Sports', tue: 'EC604 (Comm)', wed: 'EC604 (Comm)', thu: 'Seminar', fri: 'Counseling' },
      { time: '02:00 - 04:30', mon: 'VLSI Lab (G1)', tue: 'IoT Lab (G2)', wed: 'Mini Project', thu: 'DSP Lab', fri: 'Club Activity' }
    ]
  },
  {
    id: 'GI002',
    rollNo: '22GI0502',
    name: 'Priya Reddy',
    department: 'CSE',
    deptFullName: 'Computer Science & Engineering',
    year: 'III',
    semester: 'VI',
    section: 'A',
    email: 'priya.reddy@college.edu',
    phone: '+91 98765 43211',
    mentor: 'Dr. K. Srinivas (Prof. CSE)',
    attendance: 92,
    cgpa: 8.7,
    feeStatus: 'Paid',
    totalFees: 70000,
    paidFees: 70000,
    dueFees: 0,
    attendanceDetails: [
      { code: 'CS601', subject: 'Compiler Design', attended: 44, total: 46, percent: 95, faculty: 'Dr. Srinivas' },
      { code: 'CS602', subject: 'Web Technologies & Full Stack', attended: 43, total: 45, percent: 95, faculty: 'Prof. Lakshmi' },
      { code: 'CS603', subject: 'Machine Learning Basics', attended: 41, total: 45, percent: 91, faculty: 'Dr. Anand' },
      { code: 'CS604', subject: 'Cloud Computing & DevOps', attended: 39, total: 44, percent: 88, faculty: 'Prof. Harish' },
      { code: 'CS605', subject: 'Full Stack Lab', attended: 19, total: 20, percent: 95, faculty: 'Prof. Lakshmi' }
    ],
    internalMarks: [
      { code: 'CS601', subject: 'Compiler Design', mid1: 28, mid2: 29, assign: 10, total: 39, max: 40 },
      { code: 'CS602', subject: 'Web Technologies & Full Stack', mid1: 29, mid2: 30, assign: 10, total: 40, max: 40 },
      { code: 'CS603', subject: 'Machine Learning Basics', mid1: 27, mid2: 28, assign: 9, total: 37, max: 40 },
      { code: 'CS604', subject: 'Cloud Computing & DevOps', mid1: 26, mid2: 27, assign: 9, total: 36, max: 40 },
      { code: 'CS605', subject: 'Full Stack Lab', mid1: 40, mid2: 40, assign: 10, total: 50, max: 50 }
    ],
    timetable: [
      { time: '09:00 - 10:00', mon: 'CS601 (CD)', tue: 'CS602 (WT)', wed: 'CS603 (ML)', thu: 'CS604 (Cloud)', fri: 'CS601 (CD)' },
      { time: '10:00 - 11:00', mon: 'CS602 (WT)', tue: 'CS603 (ML)', wed: 'CS601 (CD)', thu: 'CS602 (WT)', fri: 'CS603 (ML)' },
      { time: '11:15 - 12:15', mon: 'CS604 (Cloud)', tue: 'CS601 (CD)', wed: 'CS604 (Cloud)', thu: 'CS603 (ML)', fri: 'CS602 (WT)' },
      { time: '12:15 - 01:15', mon: 'Technical Seminar', tue: 'CS604 (Cloud)', wed: 'Library', thu: 'Aptitude Prep', fri: 'CoderClub' },
      { time: '02:00 - 04:30', mon: 'Full Stack Lab', tue: 'ML Practical', wed: 'Project Work', thu: 'Open Source Lab', fri: 'Hackathon Prep' }
    ]
  },
  {
    id: 'GI003',
    rollNo: '22GI0203',
    name: 'Arjun Kumar',
    department: 'EEE',
    deptFullName: 'Electrical & Electronics Engineering',
    year: 'III',
    semester: 'VI',
    section: 'B',
    email: 'arjun.kumar@college.edu',
    phone: '+91 98765 43212',
    mentor: 'Dr. M. Radhika (Prof. EEE)',
    attendance: 81,
    cgpa: 7.9,
    feeStatus: 'Pending',
    totalFees: 65000,
    paidFees: 45000,
    dueFees: 20000,
    attendanceDetails: [
      { code: 'EE601', subject: 'Power System Analysis', attended: 38, total: 46, percent: 82, faculty: 'Dr. Radhika' },
      { code: 'EE602', subject: 'Power Electronics & Drives', attended: 37, total: 45, percent: 82, faculty: 'Prof. Prasad' },
      { code: 'EE603', subject: 'Microcontrollers & PLC', attended: 36, total: 44, percent: 81, faculty: 'Dr. Balaji' },
      { code: 'EE604', subject: 'Renewable Energy Systems', attended: 35, total: 45, percent: 77, faculty: 'Prof. Suresh' },
      { code: 'EE605', subject: 'Power Electronics Lab', attended: 17, total: 20, percent: 85, faculty: 'Prof. Prasad' }
    ],
    internalMarks: [
      { code: 'EE601', subject: 'Power System Analysis', mid1: 24, mid2: 25, assign: 8, total: 33, max: 40 },
      { code: 'EE602', subject: 'Power Electronics & Drives', mid1: 25, mid2: 26, assign: 8, total: 34, max: 40 },
      { code: 'EE603', subject: 'Microcontrollers & PLC', mid1: 26, mid2: 27, assign: 9, total: 35, max: 40 },
      { code: 'EE604', subject: 'Renewable Energy Systems', mid1: 23, mid2: 24, assign: 8, total: 32, max: 40 },
      { code: 'EE605', subject: 'Power Electronics Lab', mid1: 36, mid2: 37, assign: 9, total: 46, max: 50 }
    ],
    timetable: [
      { time: '09:00 - 10:00', mon: 'EE601 (PSA)', tue: 'EE602 (PE)', wed: 'EE603 (PLC)', thu: 'EE604 (RES)', fri: 'EE601 (PSA)' },
      { time: '10:00 - 11:00', mon: 'EE602 (PE)', tue: 'EE603 (PLC)', wed: 'EE601 (PSA)', thu: 'EE602 (PE)', fri: 'EE603 (PLC)' },
      { time: '11:15 - 12:15', mon: 'EE604 (RES)', tue: 'EE601 (PSA)', wed: 'EE604 (RES)', thu: 'EE603 (PLC)', fri: 'EE602 (PE)' },
      { time: '12:15 - 01:15', mon: 'Seminar', tue: 'Library', wed: 'Sports', thu: 'Aptitude', fri: 'Counseling' },
      { time: '02:00 - 04:30', mon: 'PE Lab', tue: 'PLC Lab', wed: 'Simulation Lab', thu: 'Project Work', fri: 'Skill Workshop' }
    ]
  },
  {
    id: 'GI004',
    rollNo: '23GI0504',
    name: 'Sneha Reddy',
    department: 'CSE',
    deptFullName: 'Computer Science & Engineering',
    year: 'II',
    semester: 'IV',
    section: 'A',
    email: 'sneha.reddy@college.edu',
    phone: '+91 98765 43213',
    mentor: 'Prof. T. V. Rao (Assoc. Prof. CSE)',
    attendance: 95,
    cgpa: 9.1,
    feeStatus: 'Paid',
    totalFees: 70000,
    paidFees: 70000,
    dueFees: 0,
    attendanceDetails: [
      { code: 'CS401', subject: 'Design & Analysis of Algorithms', attended: 45, total: 46, percent: 97, faculty: 'Prof. Rao' },
      { code: 'CS402', subject: 'Operating Systems Concepts', attended: 43, total: 45, percent: 95, faculty: 'Dr. Padmaja' },
      { code: 'CS403', subject: 'Database Management Systems', attended: 44, total: 46, percent: 95, faculty: 'Prof. Murali' },
      { code: 'CS404', subject: 'Java & Object Oriented Design', attended: 42, total: 44, percent: 95, faculty: 'Prof. Divya' },
      { code: 'CS405', subject: 'DBMS & OS Laboratory', attended: 20, total: 20, percent: 100, faculty: 'Prof. Murali' }
    ],
    internalMarks: [
      { code: 'CS401', subject: 'Design & Analysis of Algorithms', mid1: 30, mid2: 29, assign: 10, total: 40, max: 40 },
      { code: 'CS402', subject: 'Operating Systems Concepts', mid1: 29, mid2: 29, assign: 10, total: 39, max: 40 },
      { code: 'CS403', subject: 'Database Management Systems', mid1: 29, mid2: 30, assign: 10, total: 40, max: 40 },
      { code: 'CS404', subject: 'Java & Object Oriented Design', mid1: 28, mid2: 29, assign: 10, total: 39, max: 40 },
      { code: 'CS405', subject: 'DBMS & OS Laboratory', mid1: 40, mid2: 40, assign: 10, total: 50, max: 50 }
    ],
    timetable: [
      { time: '09:00 - 10:00', mon: 'CS401 (DAA)', tue: 'CS402 (OS)', wed: 'CS403 (DBMS)', thu: 'CS404 (Java)', fri: 'CS401 (DAA)' },
      { time: '10:00 - 11:00', mon: 'CS402 (OS)', tue: 'CS403 (DBMS)', wed: 'CS401 (DAA)', thu: 'CS402 (OS)', fri: 'CS403 (DBMS)' },
      { time: '11:15 - 12:15', mon: 'CS404 (Java)', tue: 'CS401 (DAA)', wed: 'CS404 (Java)', thu: 'CS403 (DBMS)', fri: 'CS402 (OS)' },
      { time: '12:15 - 01:15', mon: 'Competitive Coding', tue: 'Library', wed: 'Seminar', thu: 'Club Activity', fri: 'Counseling' },
      { time: '02:00 - 04:30', mon: 'DBMS Lab', tue: 'Java Lab', wed: 'OS Lab', thu: 'Algorithm Hackathon', fri: 'Mentorship' }
    ]
  },
  {
    id: 'GI005',
    rollNo: '21GI0305',
    name: 'Kiran Kumar',
    department: 'ME',
    deptFullName: 'Mechanical Engineering',
    year: 'IV',
    semester: 'VIII',
    section: 'B',
    email: 'kiran.kumar@college.edu',
    phone: '+91 98765 43214',
    mentor: 'Dr. G. Ravindra (Prof. ME)',
    attendance: 78,
    cgpa: 7.6,
    feeStatus: 'Paid',
    totalFees: 60000,
    paidFees: 60000,
    dueFees: 0,
    attendanceDetails: [
      { code: 'ME801', subject: 'CAD/CAM & CIM', attended: 36, total: 45, percent: 80, faculty: 'Dr. Ravindra' },
      { code: 'ME802', subject: 'Robotics & Automation', attended: 35, total: 44, percent: 79, faculty: 'Prof. Chandra' },
      { code: 'ME803', subject: 'Automobile Engineering', attended: 34, total: 45, percent: 75, faculty: 'Dr. Naidu' },
      { code: 'ME804', subject: 'Operations Research', attended: 36, total: 46, percent: 78, faculty: 'Prof. Srinivas' },
      { code: 'ME805', subject: 'Major Project Phase-II', attended: 18, total: 20, percent: 90, faculty: 'Dr. Ravindra' }
    ],
    internalMarks: [
      { code: 'ME801', subject: 'CAD/CAM & CIM', mid1: 24, mid2: 25, assign: 8, total: 33, max: 40 },
      { code: 'ME802', subject: 'Robotics & Automation', mid1: 25, mid2: 24, assign: 8, total: 33, max: 40 },
      { code: 'ME803', subject: 'Automobile Engineering', mid1: 23, mid2: 24, assign: 8, total: 32, max: 40 },
      { code: 'ME804', subject: 'Operations Research', mid1: 24, mid2: 25, assign: 8, total: 33, max: 40 },
      { code: 'ME805', subject: 'Major Project Phase-II', mid1: 45, mid2: 46, assign: 10, total: 92, max: 100 }
    ],
    timetable: [
      { time: '09:00 - 10:00', mon: 'ME801 (CAD)', tue: 'ME802 (Robo)', wed: 'ME803 (Auto)', thu: 'ME804 (OR)', fri: 'ME801 (CAD)' },
      { time: '10:00 - 11:00', mon: 'ME802 (Robo)', tue: 'ME803 (Auto)', wed: 'ME801 (CAD)', thu: 'ME802 (Robo)', fri: 'ME803 (Auto)' },
      { time: '11:15 - 12:15', mon: 'ME804 (OR)', tue: 'ME801 (CAD)', wed: 'ME804 (OR)', thu: 'ME803 (Auto)', fri: 'ME802 (Robo)' },
      { time: '12:15 - 01:15', mon: 'Placement Prep', tue: 'Library', wed: 'Technical Talk', thu: 'CAD Forum', fri: 'Project Review' },
      { time: '02:00 - 04:30', mon: 'Major Project', tue: 'Robotics Lab', wed: 'CIM Simulation', thu: 'Industry Visit / Lab', fri: 'Seminar' }
    ]
  }
];

// Helper: support both GI001 and GP001 alias patterns
function normalizeStudentId(id) {
  if (!id) return '';
  let clean = id.trim().toUpperCase();
  if (clean.startsWith('GP')) {
    clean = 'GI' + clean.slice(2);
  }
  return clean;
}

// Student LocalStorage Management
function getStoredStudents() {
  try {
    const raw = localStorage.getItem('git_students');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Storage read error:', e);
  }
  return DEFAULT_STUDENTS;
}

function saveStudents(students) {
  try {
    localStorage.setItem('git_students', JSON.stringify(students));
  } catch (e) {
    console.error('Storage write error:', e);
  }
}

function findStudent(id) {
  const norm = normalizeStudentId(id);
  const students = getStoredStudents();
  return students.find(s => normalizeStudentId(s.id) === norm);
}

// Session Management
function getStudentSession() {
  try {
    const raw = sessionStorage.getItem('git_active_student');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function setStudentSession(student) {
  try {
    sessionStorage.setItem('git_active_student', JSON.stringify(student));
  } catch (e) {}
}

function clearStudentSession() {
  try {
    sessionStorage.removeItem('git_active_student');
  } catch (e) {}
}

function getAdminSession() {
  try {
    return sessionStorage.getItem('git_admin_logged_in') === 'true';
  } catch (e) {}
  return false;
}

function setAdminSession(status) {
  try {
    if (status) {
      sessionStorage.setItem('git_admin_logged_in', 'true');
    } else {
      sessionStorage.removeItem('git_admin_logged_in');
    }
  } catch (e) {}
}

// Campus Notices & News Store
const DEFAULT_NOTICES = [
  { id: 1, title: 'B.Tech Even Semester End Examinations Timetable Announced', category: 'Examinations', date: 'October 15, 2026', badge: 'High Priority', link: 'exam-schedule.html' },
  { id: 2, title: 'Campus Recruitment Drive 2026-27: Top MNCs visiting next week', category: 'Placements', date: 'October 12, 2026', badge: 'Placement', link: 'placements.html' },
  { id: 3, title: 'Admissions Open for B.Tech Programs 2026-27 (Convenor & Management Quota)', category: 'Admissions', date: 'October 10, 2026', badge: 'Admissions', link: 'news.html' },
  { id: 4, title: 'Annual National Hackathon "CodeStorm 2026" organized by CoderClub', category: 'Events', date: 'October 08, 2026', badge: 'Event', link: 'events.html' },
  { id: 5, title: 'Semester Fee Payment Deadline Extended till October 25, 2026', category: 'Academic', date: 'October 05, 2026', badge: 'Notice', link: 'fees.html' },
  { id: 6, title: 'Student Innovation Grants announced under CIE Innovation Hub', category: 'Research', date: 'October 01, 2026', badge: 'Research', link: 'cie-club.html' }
];

function getStoredNotices() {
  try {
    const raw = localStorage.getItem('git_notices');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return DEFAULT_NOTICES;
}

function saveNotices(notices) {
  try {
    localStorage.setItem('git_notices', JSON.stringify(notices));
  } catch (e) {}
}

// Campus Events Store
const DEFAULT_EVENTS = [
  { id: 101, title: 'CodeStorm 2026: 24-Hour Inter-College Hackathon', category: 'Technical', date: 'Nov 14-15, 2026', venue: 'Central Computing Complex', time: '09:00 AM onwards', organizer: 'CoderClub & CSE Dept', registered: 142 },
  { id: 102, title: 'National Seminar on Next-Gen Semiconductor VLSI Design', category: 'Workshops', date: 'Nov 20, 2026', venue: 'Main Auditorium', time: '10:00 AM - 04:30 PM', organizer: 'ECE Department', registered: 98 },
  { id: 103, title: 'IGNITE 2026: Annual Cultural & Arts Festival', category: 'Cultural', date: 'Dec 05-06, 2026', venue: 'Open Air Theatre', time: '05:00 PM onwards', organizer: 'Student Affairs', registered: 350 },
  { id: 104, title: 'Inter-Department Cricket & Volleyball Championship', category: 'Sports', date: 'Dec 12-14, 2026', venue: 'College Sports Ground', time: '08:30 AM', organizer: 'Physical Education Dept', registered: 180 },
  { id: 105, title: 'Hands-on Bootcamp: Cloud Native Architectures & DevOps', category: 'Workshops', date: 'Dec 18, 2026', venue: 'Software Lab 4', time: '09:30 AM - 04:00 PM', organizer: 'AI & Data Science Dept', registered: 76 },
  { id: 106, title: 'Startup Pitch Fest 2026: Angel Investor Interaction', category: 'Innovation', date: 'Jan 08, 2027', venue: 'CIE Innovation Lounge', time: '10:30 AM', organizer: 'CIE Club', registered: 45 }
];

function getStoredEvents() {
  try {
    const raw = localStorage.getItem('git_events');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return DEFAULT_EVENTS;
}

function saveEvents(events) {
  try {
    localStorage.setItem('git_events', JSON.stringify(events));
  } catch (e) {}
}

// Verified Reviews & Feedback Store
const DEFAULT_REVIEWS = [
  { id: 1, name: 'Sravan Varma', role: 'Alumnus (CSE 2024)', company: 'Software Engineer @ Amazon', rating: 5, category: 'Placements & Academics', text: 'The coding culture and faculty support at GIT are outstanding. The practical lab sessions and hackathons organized by CoderClub gave me the confidence to crack competitive tech interviews.' },
  { id: 2, name: 'Ananya Sharma', role: 'Final Year Student (ECE)', company: 'Placed @ Qualcomm', rating: 5, category: 'Laboratories & Mentorship', text: 'Our VLSI and Embedded Systems laboratories have industry-standard tools. Faculty members are always ready to guide you on research papers, mini projects, and core hardware design.' },
  { id: 3, name: 'Vikram Joshi', role: 'Alumnus (Mechanical 2023)', company: 'Design Engineer @ Tata Motors', rating: 5, category: 'Infrastructure & Hands-on Labs', text: 'The CAD Forum and fabrication workshops provided genuine hands-on experience in 3D modeling and automation. Highly recommend GIT for practical engineering.' },
  { id: 4, name: 'B. Swathi', role: 'Third Year Student (AI & DS)', company: 'President, CIE Club', rating: 5, category: 'Innovation & Clubs', text: 'The campus ecosystem is dynamic. From robotics to entrepreneurship, you get continuous encouragement to build prototypes and present your ideas at national competitions.' }
];

function getStoredReviews() {
  try {
    const raw = localStorage.getItem('git_reviews');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return DEFAULT_REVIEWS;
}

function saveReviews(reviews) {
  try {
    localStorage.setItem('git_reviews', JSON.stringify(reviews));
  } catch (e) {}
}

// Library Resources Catalog
const LIBRARY_RESOURCES = [
  { id: 'LIB01', title: 'Data Structures and Algorithms Made Easy', author: 'Narasimha Karumanchi', department: 'CSE / AI', semester: 'III', category: 'E-Book', format: 'PDF', reads: 1420 },
  { id: 'LIB02', title: 'Microelectronic Circuits (7th Edition)', author: 'Adel S. Sedra, Kenneth C. Smith', department: 'ECE', semester: 'IV', category: 'E-Book', format: 'PDF', reads: 980 },
  { id: 'LIB03', title: 'Power System Engineering', author: 'I.J. Nagrath & D.P. Kothari', department: 'EEE', semester: 'V', category: 'E-Book', format: 'PDF', reads: 750 },
  { id: 'LIB04', title: 'Design of Machine Elements', author: 'V.B. Bhandari', department: 'Mechanical', semester: 'VI', category: 'E-Book', format: 'PDF', reads: 890 },
  { id: 'LIB05', title: 'Structural Analysis (SI Edition)', author: 'R.C. Hibbeler', department: 'Civil', semester: 'V', category: 'E-Book', format: 'PDF', reads: 640 },
  { id: 'LIB06', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', department: 'AI & Data Science', semester: 'V', category: 'E-Book', format: 'PDF', reads: 1850 },
  { id: 'LIB07', title: 'B.Tech ECE VLSI Laboratory Manual 2026', author: 'ECE Dept Faculty', department: 'ECE', semester: 'VI', category: 'Lab Manual', format: 'PDF', reads: 1120 },
  { id: 'LIB08', title: 'Operating Systems & Compiler Design PYQs (2020-2025)', author: 'GIT Exam Cell', department: 'CSE', semester: 'VI', category: 'Question Papers', format: 'PDF', reads: 2310 }
];

// Compatibility export
const STUDENTS = getStoredStudents();
