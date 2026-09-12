// Blush Beauty Studio — shared interactions
document.addEventListener("DOMContentLoaded", () => {
  /* nav background on scroll */
  const nav = document.querySelector(".site-nav");
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* mobile menu */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      links.classList.toggle("open");
      document.body.style.overflow = links.classList.contains("open")
        ? "hidden"
        : "";
    });
    links.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        links.classList.remove("open");
        document.body.style.overflow = "";
      }),
    );
  }

  /* scroll reveal */
  const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );
  revealEls.forEach((el) => io.observe(el));

  /* hero text reveal on load (single orchestrated moment) */
  const heroCopy = document.querySelector(".hero-reveal");
  if (heroCopy) {
    requestAnimationFrame(() => heroCopy.classList.add("in"));
  }
});
