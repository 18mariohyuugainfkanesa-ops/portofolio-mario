const body = document.body;
const themeButton = document.getElementById("themeButton");
const savedTheme = localStorage.getItem("tema");

// Mengatur mode awal
function applyTheme(theme) {
  body.classList.toggle("light", theme === "light");

  // Mode gelap menampilkan matahari untuk beralih ke terang
  themeButton.textContent = theme === "light" ? "🌙" : "☀️";
}

applyTheme(savedTheme === "light" ? "light" : "dark");

// Tombol mode gelap dan terang
themeButton.addEventListener("click", () => {
  const nextTheme = body.classList.contains("light")
    ? "dark"
    : "light";

  localStorage.setItem("tema", nextTheme);
  applyTheme(nextTheme);
});

// Menu navigasi HP
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Menutup menu setelah tautan dipilih
navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

// Menampilkan foto profil jika file foto tersedia
const photo = document.getElementById("profilePhoto");
const fallback = document.getElementById("profileFallback");

photo.addEventListener("load", () => {
  photo.style.display = "block";
  fallback.style.display = "none";
});

photo.addEventListener("error", () => {
  photo.style.display = "none";
  fallback.style.display = "grid";
});

// Tahun otomatis pada footer
document.getElementById("year").textContent =
  new Date().getFullYear();

// Animasi saat elemen masuk ke layar
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12
});

// Mengaktifkan animasi pada bagian website
document.querySelectorAll(
  ".hero-copy, .hero-visual, .section-heading, " +
  ".about-card, .skill-card, .project-card, " +
  ".contact-grid > div"
).forEach(element => {
  element.classList.add("reveal");
  observer.observe(element);
});
