document.addEventListener("DOMContentLoaded", () => {
  // === NAVIGATION HIGHLIGHTING ===
  const navLinks = document.querySelectorAll(".navlink ul li a");
  const sections = document.querySelectorAll("section");

  const highlightNav = () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  };
  window.addEventListener("scroll", highlightNav);
  highlightNav();

  // === HORIZONTAL SCROLL FOR .about (WHEEL + TOUCH) ===
  const about = document.querySelector(".about");
  let startY = 0;
  let startX = 0;

  if (about) {
    // Mouse Wheel to Horizontal Scroll
    about.addEventListener("wheel", (e) => {
      const isAtStart = about.scrollLeft <= 0;
      const isAtEnd = about.scrollLeft + about.clientWidth >= about.scrollWidth - 1;

      if ((e.deltaY < 0 && !isAtStart) || (e.deltaY > 0 && !isAtEnd)) {
        e.preventDefault();
        about.scrollLeft += e.deltaY * 10;
      }

      if ((e.deltaY > 0 && isAtEnd) || (e.deltaY < 0 && isAtStart)) {
        const currentSection = about.closest("section");
        const next = e.deltaY > 0 ? currentSection.nextElementSibling : currentSection.previousElementSibling;
        if (next) next.scrollIntoView({ behavior: "smooth" });
      }
    }, { passive: false });

    // Touch start: record initial position
    about.addEventListener("touchstart", (e) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
    }, { passive: true });

    // Touch move: vertical swipe => horizontal scroll
    about.addEventListener("touchmove", (e) => {
      const touchY = e.touches[0].clientY;
      const touchX = e.touches[0].clientX;
      const deltaY = startY - touchY;
      const deltaX = startX - touchX;

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        about.scrollLeft += deltaY;
        startY = touchY;
        e.preventDefault();
      }
    }, { passive: false });

    // Touch end: detect edge and jump section
    about.addEventListener("touchend", () => {
      const isAtStart = about.scrollLeft <= 0;
      const isAtEnd = about.scrollLeft + about.clientWidth >= about.scrollWidth - 1;

      if (isAtEnd || isAtStart) {
        const currentSection = about.closest("section");
        const next = isAtEnd ? currentSection.nextElementSibling : currentSection.previousElementSibling;
        if (next) next.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
});
