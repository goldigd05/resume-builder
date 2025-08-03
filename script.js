// === Save Form Data to localStorage ===
const form = document.getElementById('resumeForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      education: document.getElementById('education').value,
      experience: document.getElementById('experience').value,
      projects: document.getElementById('projects').value,
      certificates: document.getElementById('certificates').value,
      portfolio: document.getElementById('portfolio').value,
      linkedin: document.getElementById('linkedin').value,
      github: document.getElementById('github').value,
      skills: document.getElementById('skills').value,
      image: document.getElementById('profilePic').src || ''
    };

    localStorage.setItem('resumeData', JSON.stringify(formData));
    window.location.href = 'resume.html';
  });
}

// === Render Resume on resume.html ===
if (window.location.pathname.includes('resume.html')) {
  const preview = document.getElementById('resumePreview');
  const storedData = JSON.parse(localStorage.getItem('resumeData'));

  if (storedData && preview) {
    const skillsHTML = storedData.skills
      .split(',')
      .map(skill => `<li>${skill.trim()}</li>`)
      .join('');

    preview.innerHTML = `
      <div class="resume-card">
        <div class="left">
          <img src="${storedData.image}" alt="Profile Image" />
          <h2>${storedData.fullName}</h2>
          <p><strong>Email:</strong> ${storedData.email}</p>
          <p><strong>Phone:</strong> ${storedData.phone}</p>
          <p><strong>Address:</strong> ${storedData.address}</p>
          <p><strong>LinkedIn:</strong> <a href="${storedData.linkedin}" target="_blank">${storedData.linkedin}</a></p>
          <p><strong>GitHub:</strong> <a href="${storedData.github}" target="_blank">${storedData.github}</a></p>
          <p><strong>Portfolio:</strong> <a href="${storedData.portfolio}" target="_blank">${storedData.portfolio}</a></p>
        </div>
        <div class="right">
          <h3>Education</h3>
          <p>${storedData.education}</p>
          <h3>Experience</h3>
          <p>${storedData.experience}</p>
          <h3>Projects</h3>
          <p>${storedData.projects}</p>
          <h3>Certificates</h3>
          <p>${storedData.certificates}</p>
          <h3>Skills</h3>
          <ul>${skillsHTML}</ul>
        </div>
      </div>
    `;
  }
}

// === Image Upload Preview ===
const fileInput = document.getElementById('profileInput');
const imgPreview = document.getElementById('profilePic');

if (fileInput && imgPreview) {
  fileInput.addEventListener('change', function () {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

// === Theme Toggle ===
const themeToggle = document.getElementById('themeToggle');
const themeSelector = document.getElementById('themeSelector');
const body = document.body;

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');
  });
}

if (themeSelector) {
  themeSelector.addEventListener('change', () => {
    body.classList.remove('mesho-theme', 'indigo-theme', 'teal-theme');
    body.classList.add(themeSelector.value);
  });
}

// === Download Resume as PDF ===
const downloadBtn = document.getElementById('downloadPDF');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const element = document.getElementById('resumePreview');
    if (element) {
      html2pdf().from(element).save('My_Resume.pdf');
    }
  });
}
