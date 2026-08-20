/* =====================================================
   CrystalClean Premium JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* Mobile Navigation */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("open");
    });
  }

  /* Close Mobile Menu */
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("open");
    });
  });

  /* Sticky Navbar */
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
  });

  /* Animated Counter */
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const target = Number(counter.dataset.target);
    const update = () => {
      const current = Number(counter.innerText);
      const increment = target / 100;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });

  /* Smooth Scroll */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
});

/* Scroll Progress Bar */
const progress = document.createElement("div");
progress.className = "progress-bar";
document.body.appendChild(progress);

window.addEventListener("scroll", () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const current = (window.pageYOffset / total) * 100;
  progress.style.width = current + "%";
});

/* Back To Top Button */
const topBtn = document.createElement("button");
topBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
topBtn.className = "back-top";
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
  if (window.scrollY > 500) {
    topBtn.classList.add("show");
  } else {
    topBtn.classList.remove("show");
  }
});

topBtn.onclick = () => {
  const startY = window.pageYOffset;
  const duration = 800;
  let startTime = null;

  const step = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, startY * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

/* Card Hover Tilt */
document.querySelectorAll(".service-card,.price-card,.testimonial-card,.why-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = (x - rect.width / 2) / 18;
    const rotateX = -(y - rect.height / 2) / 18;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* Hero Parallax */
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.backgroundPositionY = window.pageYOffset * 0.35 + "px";
  }
});

/* Navbar Active Links */
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (pageYOffset >= top) {
      current = section.getAttribute("id");
    }
  });
  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* Scroll Reveal Animation */
const revealElements = document.querySelectorAll(".fade-up, .fade-left, .fade-right, .zoom-in");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});

/* Remove Preloader */
window.addEventListener("load", () => {
  const loader = document.getElementById("preloader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 500);
  }
});

/* Cookie Notice */
const cookieBanner = document.getElementById("cookieBanner");
const acceptCookie = document.getElementById("acceptCookie");

const hideCookieBanner = () => {
  if (cookieBanner) {
    cookieBanner.classList.add("is-hidden");
    cookieBanner.setAttribute("aria-hidden", "true");
  }
};

if (localStorage.getItem("cookieAccepted") === "true") {
  hideCookieBanner();
} else if (cookieBanner) {
  cookieBanner.classList.remove("is-hidden");
  cookieBanner.setAttribute("aria-hidden", "false");
}

if (acceptCookie) {
  acceptCookie.onclick = () => {
    localStorage.setItem("cookieAccepted", "true");
    hideCookieBanner();
  };
}

/* Booking Modal */
const bookingBtn = document.querySelector(".booking-btn");
const bookingModal = document.querySelector(".booking-modal");
const modalClose = document.querySelector(".modal-close");

if (bookingBtn) {
  bookingBtn.onclick = (e) => {
    e.preventDefault();
    bookingModal.classList.add("active");
  };
}

if (modalClose) {
  modalClose.onclick = () => {
    bookingModal.classList.remove("active");
  };
}

if (bookingModal) {
  bookingModal.onclick = (e) => {
    if (e.target === bookingModal) {
      bookingModal.classList.remove("active");
    }
  };
}

 