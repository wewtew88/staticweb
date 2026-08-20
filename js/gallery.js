/* =====================================
  EverClean Solutions Gallery
===================================== */

const items = document.querySelectorAll(".gallery-item");
const buttons = document.querySelectorAll(".filter-btn");

buttons.forEach(button => {
  button.onclick = () => {
    buttons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    items.forEach(item => {
      item.style.display = (filter === "all" || item.classList.contains(filter)) ? "block" : "none";
    });
  };
});

/* Lightbox */
const lightbox = document.querySelector(".lightbox");
const image = document.getElementById("lightbox-image");

items.forEach(item => {
  if (lightbox && image) {
    item.onclick = () => {
      lightbox.classList.add("active");
      image.src = item.querySelector("img").src;
    };
  }
});

const closeLightbox = document.querySelector(".close-lightbox");

if (closeLightbox && lightbox) {
  closeLightbox.onclick = () => {
    lightbox.classList.remove("active");
  };

  lightbox.onclick = (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  };
}
