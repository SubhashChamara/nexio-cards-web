/**
 * Template Name: Presento
 * Template URL: https://bootstrapmade.com/presento-bootstrap-corporate-template/
 * Updated: Aug 07 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });
})();

// Real-time updates
const inputName = document.getElementById("inputName");
const inputRole = document.getElementById("inputRole");
const inputCompany = document.getElementById("inputCompany");

const cardName = document.getElementById("cardName");
const cardRole = document.getElementById("cardRole");
const cardCompany = document.getElementById("cardCompany");

inputName.addEventListener("input", () => {
  cardName.textContent = inputName.value.toUpperCase() || "YOUR NAME";
});

inputRole.addEventListener("input", () => {
  cardRole.textContent = inputRole.value.toUpperCase() || "ROLE";
});

inputCompany.addEventListener("input", () => {
  cardCompany.textContent = inputCompany.value.toUpperCase() || "COMPANY";
});

// Color Switcher
const cardFlip = document.getElementById("nexioCardFlip");
const cardFront = document.getElementById("nexioCardFront");
const cardBack = document.getElementById("nexioCardBack");
const qrFront = document.getElementById("qrImageFront");
const qrBack = document.getElementById("qrImageBack");
const logo = document.getElementById("nexioLogo");
const urlText = document.getElementById("cardUrlText");
const dots = document.querySelectorAll(".color-dot");

let flipTimeout = null;

// Flip on click
cardFlip.addEventListener("click", () => {
  // Toggle flip
  cardFlip.classList.toggle("flipped");

  // If card is flipped, set a 5-second timer to flip back
  if (cardFlip.classList.contains("flipped")) {
    clearTimeout(flipTimeout); // clear any existing timer
    flipTimeout = setTimeout(() => {
      cardFlip.classList.remove("flipped");
    }, 5000); // 5000ms = 5 seconds
  }
});

// Color switching (front/back sync, QR & logo change)
dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent accidental flip
    dots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");

    let bgColor = "#0c0c0c";
    let textColor = "#fff";
    let qrSrc = "assets/img/qr/nexio.com-white.png";
    let logoSrc = "assets/img/logo/nexio-white.png";

    if (dot.classList.contains("color-white")) {
      bgColor = "#fff";
      textColor = "#000";
      qrSrc = "assets/img/qr/nexio.com-black.png";
      logoSrc = "assets/img/logo/nexio-black.png";
    } else if (dot.classList.contains("color-black")) {
      bgColor = "#0c0c0c";
      textColor = "#fff";
      qrSrc = "assets/img/qr/nexio.com-white.png";
      logoSrc = "assets/img/logo/nexio-white.png";
    } else if (dot.classList.contains("color-blue")) {
      bgColor = "#0e2459";
      textColor = "#fff";
      qrSrc = "assets/img/qr/nexio.com-white.png";
      logoSrc = "assets/img/logo/nexio-white.png";
    }

    // Apply styles to both sides
    cardFront.style.backgroundColor = bgColor;
    cardFront.style.color = textColor;
    cardBack.style.backgroundColor = bgColor;
    cardBack.style.color = textColor;
    qrFront.src = qrSrc;
    qrBack.src = qrSrc;
    logo.src = logoSrc;
    urlText.style.color = textColor;
  });
});

const form = document.querySelector(".nexio-order-form");
const modal = document.getElementById("cardPreviewModal");
const previewImage = document.getElementById("previewImage");
const confirmBtn = document.getElementById("confirmSend");
const cancelBtn = document.getElementById("cancelPreview");

let generatedImage = null;
let message = "";
const phone = "94706600858"; // WhatsApp number (no + or 0)

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("inputName").value.trim();
  const role = document.getElementById("inputRole").value.trim();
  const company =
    document.getElementById("inputCompany").value.trim() ||
    "NEXIO CARD (PVT) LTD.";

  if (!name || !role) {
    alert("Please fill in your Name and Role / Title.");
    return;
  }

const basePath = window.location.pathname.split("/")[1];
const baseImage = new Image();
baseImage.src = `/img/card.png`;


  baseImage.onload = function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = baseImage.width;
    canvas.height = baseImage.height;

    // Draw the original card
    ctx.drawImage(baseImage, 0, 0);

    // Text styling
    ctx.fillStyle = "white";
    ctx.textAlign = "left"; // Center align horizontally
    ctx.textBaseline = "middle"; // Easier vertical control

    // Calculate the horizontal center of the image
    const centerX = 40;

    // Add name (larger font)
    ctx.font = "bold 16px Poppins";
    ctx.fillText(name.toUpperCase(), centerX, 100);

    // Add role (smaller font)
    ctx.font = "bold 12px Poppins";
    ctx.fillText(role.toUpperCase(), centerX, 130);

    // Add company (smallest font)
    ctx.font = "12px Poppins";
    ctx.fillText(company.toUpperCase(), centerX, 150);

    // Convert to data URL
    generatedImage = canvas.toDataURL("image/png");
    previewImage.src = generatedImage;

    // Prepare WhatsApp message
    message =
      `New Nexio Card order:%0A` +
      `*Full Name:* ${name}%0A` +
      `*Role / Title:* ${role}%0A` +
      (company ? `*Company:* ${company}%0A` : "") +
      `%0AUser’s personalized card image is attached.`;

    // Show modal
    modal.style.display = "block";
  };
});

confirmBtn.addEventListener("click", function () {
  if (generatedImage) {
    // Trigger image download
    const link = document.createElement("a");
    link.download = "nexio_card.png";
    link.href = generatedImage;
    link.click();

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${phone}?text=${message}`;
    window.open(whatsappURL, "_blank");

    // Close modal
    modal.style.display = "none";
  }
});

cancelBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Close modal when clicking outside
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
