const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navButtons = document.querySelectorAll('.nav-button');

// Fungsi untuk menambahkan kelas 'selected' pada tombol berdasarkan section
function updateNavbarState() {
  let activeSection = null;
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 200 && rect.bottom > 200) {
      activeSection = section;
    }
  });

  if (activeSection) {
    const targetButton = document.querySelector(`.nav-button[data-target="${activeSection.id}"]`);
    if (targetButton) {
      navButtons.forEach((btn) => btn.classList.remove('selected'));
      targetButton.classList.add('selected');
    }
  }

  // Fixed navbar khusus di Home
  const homeSection = document.getElementById('home');
  const homeRect = homeSection.getBoundingClientRect();
  if (homeRect.top <= 0 && homeRect.bottom > 0) {
    navbar.classList.add('fixed');
  } else {
    navbar.classList.remove('fixed');
  }
}

// Fungsi untuk scroll ke section dengan offset 200px
function scrollToSection(id) {
  const section = document.getElementById(id);
  const offset = 150; // Offset atas sebesar 200px
  const sectionTop = section.getBoundingClientRect().top + window.pageYOffset; // Posisi section relatif terhadap halaman
  window.scrollTo({
    top: sectionTop - offset,
    behavior: 'smooth', // Scroll animasi halus
  });
}

// Event listener untuk tombol navbar
navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    scrollToSection(targetId);
  });
});

// Event listener untuk scrolling
window.addEventListener('scroll', updateNavbarState);
