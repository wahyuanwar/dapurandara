document.addEventListener("DOMContentLoaded", function () {
  // CATATAN: Fungsi showMainContent dan showSpecialContent DIHAPUS
  // karena semua konten sekarang harus terlihat dan di-scroll di satu halaman.

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

  // --- 2. Toggle Flowcharts dan Roadmap (Logika ini tetap dipertahankan) ---
  const toggleButtons = document.querySelectorAll(".toggle-button");
  toggleButtons.forEach((button) => {
    const targetId = button.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);

    // Pastikan konten tersembunyi secara default menggunakan class CSS
    if (targetElement) {
      // Tambahkan class untuk menyembunyikan konten awal
      targetElement.classList.add("toggle-content-hidden");
    }

    button.addEventListener("click", function () {
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

  // --- 4. SEMUA TAUTAN SCROLL ---
  const allNavLinks = mainNav.querySelectorAll("a");

  allNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Tutup menu mobile jika sedang terbuka
      if (mainNav.classList.contains("active")) {
        mainNav.classList.remove("active");
      }

      if (href && href.startsWith("#")) {
        // Semua link (termasuk Strategi/Aktivis) akan melakukan SCROLL
        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Lakukan smooth scroll ke semua section
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
});
