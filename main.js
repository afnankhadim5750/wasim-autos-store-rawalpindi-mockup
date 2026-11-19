// Wasim Autos Store — mobile menu, scroll-spy, lightbox, reveal.
(function () {
  "use strict";

  // ---- Mobile menu (instant toggle, no transition) ----
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.hidden;
      menu.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  // ---- Scroll-spy ----
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".main-nav a")
  );
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id);
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(function (s) { obs.observe(s); });
  }

  // ---- Reveal on scroll ----
  var revealEls = document.querySelectorAll(
    ".part-card, .bring-card, .why-card, .gallery-tile, .how-steps li, .model-board li"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var robs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visible"); robs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    revealEls.forEach(function (el) { robs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // ---- Lightbox ----
  var lightbox = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbCap = document.getElementById("lightbox-cap");
  var closeBtn = lightbox ? lightbox.querySelector(".lightbox-close") : null;
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
  }
  document.querySelectorAll(".gallery-tile").forEach(function (tile) {
    tile.addEventListener("click", function () {
      lbImg.src = tile.getAttribute("data-full");
      lbImg.alt = tile.getAttribute("data-alt") || "";
      lbCap.textContent = tile.querySelector("span").textContent;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    });
  });
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
  });
})();
