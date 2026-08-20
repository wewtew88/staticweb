/* =====================================
  EverClean Solutions Preloader
===================================== */

(function () {
  let hidden = false;

  function hidePreloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader || hidden) {
      return;
    }

    hidden = true;
    preloader.style.opacity = "0";
    setTimeout(function () {
      preloader.style.display = "none";
    }, 500);
  }

  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(hidePreloader, 600);
  });
  window.addEventListener("load", function () {
    setTimeout(hidePreloader, 300);
  });
  setTimeout(hidePreloader, 2500);
})();
