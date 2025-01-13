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


// SCROLLING CARD PROJECTS

// Pilih elemen card container
const cardContainer = document.querySelector('.card-container');

// Variabel untuk menyimpan status drag
let isDragging = false; // Apakah user sedang drag
let startX, scrollLeft; // Posisi awal drag dan scroll

// Event listener saat drag dimulai (mouse/touch)
cardContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - cardContainer.offsetLeft; // Posisi awal mouse
  scrollLeft = cardContainer.scrollLeft; // Posisi awal scroll container
  cardContainer.style.cursor = 'grabbing'; // Ubah cursor saat drag
});

cardContainer.addEventListener('mouseleave', () => {
  isDragging = false; // Reset saat mouse keluar container
  cardContainer.style.cursor = 'grab'; // Kembalikan cursor
});

cardContainer.addEventListener('mouseup', () => {
  isDragging = false; // Reset saat mouse dilepas
  cardContainer.style.cursor = 'grab';
});

cardContainer.addEventListener('mousemove', (e) => {
  if (!isDragging) return; // Jika tidak sedang drag, abaikan
  e.preventDefault(); // Hentikan default behavior mouse
  const x = e.pageX - cardContainer.offsetLeft; // Posisi saat ini
  const walk = (x - startX) * 2; // Hitung jarak drag (bisa disesuaikan)
  cardContainer.scrollLeft = scrollLeft - walk; // Update posisi scroll
});

// Untuk mendukung touch device
cardContainer.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - cardContainer.offsetLeft; // Posisi awal touch
  scrollLeft = cardContainer.scrollLeft;
});

cardContainer.addEventListener('touchend', () => {
  isDragging = false; // Reset saat touch selesai
});

cardContainer.addEventListener('touchmove', (e) => {
  if (!isDragging) return; // Abaikan jika tidak sedang drag
  const x = e.touches[0].pageX - cardContainer.offsetLeft; // Posisi touch
  const walk = (x - startX) * 2; // Hitung jarak drag (bisa disesuaikan)
  cardContainer.scrollLeft = scrollLeft - walk; // Update posisi scroll
});
