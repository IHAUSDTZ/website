document.addEventListener("DOMContentLoaded", () => {
  // Navigation highlighting
  const navLinks = document.querySelectorAll("nav ul li a");
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

  // Gallery setup
  const images = [
    "asset/i1.jpg",
    "asset/i2.jpg",
    "asset/i3.jpg",
    "asset/i4.jpg",
    "asset/i5.jpg",
    "asset/i6.jpg",
    "asset/i7.jpg",
    "asset/i8.jpg",
    "asset/i9.jpg",
    "asset/i10.jpg",
  ];

  const gallery = document.getElementById("gallery-grid");
  let currentImageIndex = 0;

  // Populate gallery
  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Gallery Image ${index + 1}`;
    img.onclick = () => openLightbox(index);
    gallery.appendChild(img);
  });

  // Lightbox functions
  window.openLightbox = (index) => {
    currentImageIndex = index;
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = images[index];
    lightbox.style.display = "flex";
  };

  window.closeLightbox = () => {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
  };

  window.changeImage = (direction) => {
    currentImageIndex =
      (currentImageIndex + direction + images.length) % images.length;
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = images[currentImageIndex];
  };
});
document.addEventListener("DOMContentLoaded", function () {
  const texts = ["Integrated Hill Area Upliftment Society", "IHAUS"];

  const span = document.querySelector(".content li span");
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let speed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      charIndex--;
      span.textContent = currentText.substring(0, charIndex);
    } else {
      charIndex++;
      span.textContent = currentText.substring(0, charIndex);
    }

    if (!isDeleting && charIndex === currentText.length) {
      setTimeout(() => (isDeleting = true), 1000); // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length; // Loop to next text
    }

    setTimeout(type, isDeleting ? speed / 2 : speed);
  }

  // Start animation
  type();
});
