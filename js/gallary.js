// Gallery filtering + lightbox
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const items = Array.from(document.querySelectorAll(".g-item"));

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.filter;
      items.forEach((item) => {
        const match = cat === "all" || item.dataset.category === cat;
        item.classList.toggle("hide", !match);
      });
    });
  });

  /* lightbox */
  const lightbox = document.querySelector(".lightbox");
  const lbImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lb-close");
  const prevBtn = lightbox.querySelector(".lb-prev");
  const nextBtn = lightbox.querySelector(".lb-next");
  let currentIndex = 0;

  function visibleItems() {
    return items.filter((i) => !i.classList.contains("hide"));
  }

  function openLightbox(index) {
    const list = visibleItems();
    currentIndex = index;
    const img = list[currentIndex].querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function step(dir) {
    const list = visibleItems();
    currentIndex = (currentIndex + dir + list.length) % list.length;
    const img = list[currentIndex].querySelector("img");
    lbImg.src = img.src;
    lbImg.alt = img.alt;
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const list = visibleItems();
      const idx = list.indexOf(item);
      openLightbox(idx);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
});
