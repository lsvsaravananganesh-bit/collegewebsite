// Sample Faculty Data
const FACULTY_MEMBERS = [
  {
    id: 'FAC-01',
    name: 'Dr. Aris Thorne',
    designation: 'Professor & Head of Department',
    department: 'Computer Science & Engineering',
    email: 'aris.thorne@college.edu',
    phone: '+1 (555) 234-5678',
    office: 'Block A, Room 402',
    qualification: 'Ph.D. in Artificial Intelligence (MIT)',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    researchInterests: ['Machine Learning', 'Computer Vision', 'Neural Networks'],
    publications: [
      { title: 'Scalable Vision Transformers in Edge Computing', year: 2025, journal: 'IEEE Transactions on AI' },
      { title: 'Deep Reinforcement Learning for Autonomous Navigation', year: 2023, journal: 'ACM Computing Surveys' }
    ],
    experience: '14+ Years Teaching & Research'
  },
  {
    id: 'FAC-02',
    name: 'Dr. Elena Rostova',
    designation: 'Associate Professor',
    department: 'AI & Data Science',
    email: 'elena.rostova@college.edu',
    phone: '+1 (555) 345-6789',
    office: 'Block C, Room 208',
    qualification: 'Ph.D. in Data Science (Stanford)',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    researchInterests: ['Big Data Analytics', 'NLP', 'Ethical AI'],
    publications: [
      { title: 'Mitigating Bias in Large Language Models', year: 2026, journal: 'Journal of AI Research' }
    ],
    experience: '9 Years Teaching & Industry R&D'
  },
  {
    id: 'FAC-03',
    name: 'Prof. Marcus Vance',
    designation: 'Assistant Professor',
    department: 'Electronics & Comm',
    email: 'marcus.vance@college.edu',
    phone: '+1 (555) 456-7890',
    office: 'Lab Complex 2, Room 105',
    qualification: 'M.Tech, Ph.D. Scholar (VLSI Design)',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    researchInterests: ['VLSI Architecture', 'Embedded Systems', 'IoT Sensors'],
    publications: [
      { title: 'Low-Power CMOS Sensor Architecture for IoT Devices', year: 2024, journal: 'IEEE Sensors Journal' }
    ],
    experience: '6 Years Teaching'
  },
  {
    id: 'FAC-04',
    name: 'Dr. Sarah Jenkins',
    designation: 'Professor',
    department: 'Mechanical Engineering',
    email: 'sarah.jenkins@college.edu',
    phone: '+1 (555) 567-8901',
    office: 'Workshop Complex, Room 12',
    qualification: 'Ph.D. in Robotics & Automation (UC Berkeley)',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    researchInterests: ['Kinematics', 'Mechatronics', 'Additive Manufacturing'],
    publications: [
      { title: 'Kinematic Optimization in Soft Robotic Grippers', year: 2025, journal: 'Robotics Journal' }
    ],
    experience: '12 Years Research & Academia'
  }
];

// State Variables
let currentSearch = '';
let currentDept = 'All Departments';
let viewMode = 'grid'; // 'grid' or 'list'

// DOM Elements
const facultyContainer = document.getElementById('facultyContainer');
const searchInput = document.getElementById('searchInput');
const departmentSelect = document.getElementById('departmentSelect');
const gridViewBtn = document.getElementById('gridViewBtn');
const listViewBtn = document.getElementById('listViewBtn');
const facultyCount = document.getElementById('facultyCount');
const emptyState = document.getElementById('emptyState');
const modal = document.getElementById('facultyModal');

// Render Faculty Items
function render() {
  const filtered = FACULTY_MEMBERS.filter((faculty) => {
    const matchesSearch =
      faculty.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
      faculty.designation.toLowerCase().includes(currentSearch.toLowerCase()) ||
      faculty.researchInterests.some((topic) =>
        topic.toLowerCase().includes(currentSearch.toLowerCase())
      );

    const matchesDept =
      currentDept === 'All Departments' || faculty.department === currentDept;

    return matchesSearch && matchesDept;
  });

  facultyCount.textContent = filtered.length;
  facultyContainer.className = viewMode === 'grid' ? 'grid-view' : 'list-view';

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    facultyContainer.innerHTML = '';
    return;
  }

  emptyState.classList.add('hidden');

  if (viewMode === 'grid') {
    facultyContainer.innerHTML = filtered.map((f) => `
      <div class="faculty-card">
        <div>
          <div class="card-image-wrap">
            <img src="${f.image}" alt="${f.name}" />
            <span class="dept-tag">${f.department}</span>
          </div>
          <div class="card-body">
            <h3>${f.name}</h3>
            <p class="designation">${f.designation}</p>
            <p class="qualification">🎓 ${f.qualification}</p>
            <p class="research-title">Research Focus</p>
            <div class="tag-group">
              ${f.researchInterests.map((t) => `<span class="tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="card-footer">
          <a href="mailto:${f.email}">✉️ Contact</a>
          <button class="btn-link" onclick="openModal('${f.id}')">View Profile →</button>
        </div>
      </div>
    `).join('');
  } else {
    facultyContainer.innerHTML = filtered.map((f) => `
      <div class="faculty-row">
        <div class="row-info">
          <img src="${f.image}" alt="${f.name}" />
          <div>
            <h3>${f.name}</h3>
            <p class="designation">${f.designation} • ${f.department}</p>
            <p class="qualification">${f.qualification}</p>
          </div>
        </div>
        <button class="btn-primary" onclick="openModal('${f.id}')">Full Profile</button>
      </div>
    `).join('');
  }
}

// Modal Handlers
window.openModal = function (id) {
  const f = FACULTY_MEMBERS.find((item) => item.id === id);
  if (!f) return;

  document.getElementById('modalImage').src = f.image;
  document.getElementById('modalName').textContent = f.name;
  document.getElementById('modalDesignation').textContent = f.designation;
  document.getElementById('modalDepartment').textContent = f.department;
  document.getElementById('modalEmail').textContent = f.email;
  document.getElementById('modalPhone').textContent = f.phone;
  document.getElementById('modalOffice').textContent = f.office;
  document.getElementById('modalQualification').textContent = f.qualification;
  document.getElementById('modalExperience').textContent = f.experience;

  document.getElementById('modalResearchTags').innerHTML = f.researchInterests
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join('');

  document.getElementById('modalPublications').innerHTML = f.publications
    .map(
      (p) => `
    <div>
      <strong>${p.title}</strong><br/>
      <small style="color: #64748b;">Published in ${p.journal} (${p.year})</small>
    </div>
  `
    )
    .join('');

  modal.classList.remove('hidden');
};

function closeModal() {
  modal.classList.add('hidden');
}

// Event Listeners
searchInput.addEventListener('input', (e) => {
  currentSearch = e.target.value;
  render();
});

departmentSelect.addEventListener('change', (e) => {
  currentDept = e.target.value;
  render();
});

gridViewBtn.addEventListener('click', () => {
  viewMode = 'grid';
  gridViewBtn.classList.add('active');
  listViewBtn.classList.remove('active');
  render();
});

listViewBtn.addEventListener('click', () => {
  viewMode = 'list';
  listViewBtn.classList.add('active');
  gridViewBtn.classList.remove('active');
  render();
});

document.getElementById('closeModalBtn').addEventListener('click', closeModal);
document.getElementById('modalCloseFooterBtn').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Initial Render
render();
