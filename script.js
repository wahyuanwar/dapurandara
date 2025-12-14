document.addEventListener("DOMContentLoaded", function () {
  // Semua section (kecuali strategi/aktivis yang hanya untuk tampilan khusus)
  const allSections = document.querySelectorAll("section");
  const specialSections = ["strategi", "aktivis"];
  const mainSections = Array.from(allSections).filter(
    (sec) => !specialSections.includes(sec.id)
  );

  // Fungsi untuk menampilkan konten utama (Beranda, Menu, SWOT, dll.)
  function showMainContent() {
    mainSections.forEach((sec) => (sec.style.display = "block"));
    specialSections.forEach((id) => {
      const sec = document.getElementById(id);
      if (sec) sec.style.display = "none";
    });
  }

  // Fungsi untuk menampilkan konten khusus (Strategi/Aktivis)
  function showSpecialContent(targetId) {
    // 1. Sembunyikan konten utama
    mainSections.forEach((sec) => (sec.style.display = "none"));

    // 2. Sembunyikan semua konten khusus dulu
    specialSections.forEach((id) => {
      const sec = document.getElementById(id);
      if (sec) sec.style.display = "none";
    });

    // 3. Tampilkan section target
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.style.display = "block";
    }

    // 4. Pastikan user melihatnya dengan scroll ke atas
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // --- Inisialisasi: Pastikan status awal benar ---
  showMainContent();

  // --- 1. Toggle Baca Selengkapnya di Blog ---
  const readMoreButtons = document.querySelectorAll(".read-more-toggle");
  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.classList.toggle("hidden-full-text");
        this.textContent = targetElement.classList.contains("hidden-full-text")
          ? "Baca Selengkapnya"
          : "Sembunyikan";
      }
    });
  });

  // --- 2. Toggle Flowcharts dan Roadmap ---
  const toggleButtons = document.querySelectorAll(".toggle-button");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.classList.toggle("toggle-content-hidden");
        if (targetElement.classList.contains("toggle-content-hidden")) {
          this.textContent =
            targetId === "flowcharts-content"
              ? "Tampilkan Detail Flowchart"
              : "Tampilkan Gambar Roadmap Bisnis";
        } else {
          this.textContent = "Sembunyikan Detail";
        }
      }
    });
  });

  // --- 3. Navigasi Mobile Toggle ---
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      mainNav.classList.toggle("active");
    });
  }

  // --- 4. Navigasi Tautan (Pemisahan Logika Scrolling vs Tampilan Khusus) ---
  const allNavLinks = mainNav.querySelectorAll("a");

  allNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const dataSection = this.getAttribute("data-section");

      // KUNCI PERBAIKAN: Tutup menu mobile setiap kali link diklik
      if (mainNav.classList.contains("active")) {
        mainNav.classList.remove("active");
      }

      if (dataSection) {
        // LOGIKA UNTUK STRATEGI & AKTIVIS (MENGGANTI TAMPILAN)
        e.preventDefault();
        showSpecialContent(dataSection);
      } else if (href && href.startsWith("#")) {
        // LOGIKA UNTUK SEMUA TAUTAN SCROLL (Beranda, Menu, SWOT, dll.)

        // Jika sedang di tampilan Strategi/Aktivis, kembalikan ke konten utama sebelum scroll
        if (
          document.getElementById("strategi").style.display === "block" ||
          document.getElementById("aktivis").style.display === "block"
        ) {
          showMainContent();
        }

        // Smooth Scroll ke target ID
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          e.preventDefault(); // Mencegah loncatan instan
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
});
