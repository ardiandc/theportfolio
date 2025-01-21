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
// Pilih semua elemen .card-container dan .card-container-poster
// Pilih semua elemen card container termasuk row-six-2
const cardContainers = document.querySelectorAll(
  '.card-container, .card-container-poster, .card-container-ig'
);

// Variabel untuk menyimpan status drag
let isDragging = false; // Apakah user sedang drag
let startX, scrollLeft; // Posisi awal drag dan scroll

// Fungsi untuk menangani drag pada card container
function handleDragStart(e, cardContainer) {
  isDragging = true;
  startX = e.pageX - cardContainer.offsetLeft; // Posisi awal mouse
  scrollLeft = cardContainer.scrollLeft; // Posisi awal scroll container
  cardContainer.style.cursor = 'grabbing'; // Ubah cursor saat drag
}

// Fungsi untuk menangani mouse leave
function handleMouseLeave(cardContainer) {
  isDragging = false; // Reset saat mouse keluar container
  cardContainer.style.cursor = 'grab'; // Kembalikan cursor
}

// Fungsi untuk menangani mouse up
function handleMouseUp(cardContainer) {
  isDragging = false; // Reset saat mouse dilepas
  cardContainer.style.cursor = 'grab';
}

// Fungsi untuk menangani mouse move
function handleMouseMove(e, cardContainer) {
  if (!isDragging) return; // Jika tidak sedang drag, abaikan
  e.preventDefault(); // Hentikan default behavior mouse
  const x = e.pageX - cardContainer.offsetLeft; // Posisi saat ini
  const walk = (x - startX) * 2; // Hitung jarak drag (bisa disesuaikan)
  cardContainer.scrollLeft = scrollLeft - walk; // Update posisi scroll
}

// Event listener untuk masing-masing container
cardContainers.forEach((cardContainer) => {
  // Event listener saat drag dimulai (mouse/touch)
  cardContainer.addEventListener('mousedown', (e) =>
    handleDragStart(e, cardContainer)
  );

  cardContainer.addEventListener('mouseleave', () =>
    handleMouseLeave(cardContainer)
  );

  cardContainer.addEventListener('mouseup', () =>
    handleMouseUp(cardContainer)
  );

  cardContainer.addEventListener('mousemove', (e) =>
    handleMouseMove(e, cardContainer)
  );

  // Untuk mendukung touch device
  cardContainer.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - cardContainer.offsetLeft; // Posisi awal touch
    scrollLeft = cardContainer.scrollLeft;
  });

  cardContainer.addEventListener('touchend', () => handleMouseUp(cardContainer));

  cardContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return; // Abaikan jika tidak sedang drag
    const x = e.touches[0].pageX - cardContainer.offsetLeft; // Posisi touch
    const walk = (x - startX) * 2; // Hitung jarak drag (bisa disesuaikan)
    cardContainer.scrollLeft = scrollLeft - walk; // Update posisi scroll
  });

  // Menangani scroll dengan mouse wheel
  cardContainer.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      cardContainer.scrollLeft += e.deltaY; // Scroll horizontal saat mouse wheel digulir
      e.preventDefault(); // Mencegah scroll vertikal default
    }
  });
});
