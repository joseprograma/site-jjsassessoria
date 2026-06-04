const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const progressBar = document.getElementById("scrollProgressBar");

function setMenuState(isOpen) {
  navMenu.classList.toggle("active", isOpen);
  menuBtn.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen && window.innerWidth <= 760);

  const icon = menuBtn.querySelector("i");
  icon.classList.toggle("fa-bars", !isOpen);
  icon.classList.toggle("fa-xmark", isOpen);
}

menuBtn.addEventListener("click", () => {
  const isOpen = !navMenu.classList.contains("active");
  setMenuState(isOpen);
});

document.addEventListener("click", (event) => {
  if (window.innerWidth > 760 || !navMenu.classList.contains("active")) {
    return;
  }

  const clickedInsideMenu = navMenu.contains(event.target);
  const clickedMenuButton = menuBtn.contains(event.target);

  if (!clickedInsideMenu && !clickedMenuButton) {
    setMenuState(false);
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuState(false));
});

function revealOnScroll() {
  const triggerPoint = window.innerHeight - 90;

  revealItems.forEach((item) => {
    if (item.getBoundingClientRect().top < triggerPoint) {
      item.classList.add("active");
    }
  });
}

function highlightCurrentSection() {
  let currentId = "";

  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;

    if (window.scrollY >= top && window.scrollY < bottom) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("is-active", isActive);
  });
}

function updateScrollProgress() {
  if (!progressBar) {
    return;
  }

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", () => {
  revealOnScroll();
  highlightCurrentSection();
  updateScrollProgress();

  header.style.boxShadow =
    window.scrollY > 24 ? "0 10px 26px rgba(24, 33, 47, 0.08)" : "none";
  header.style.background =
    window.scrollY > 24 ? "rgba(248, 244, 236, 0.97)" : "rgba(248, 244, 236, 0.92)";
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    setMenuState(false);
    document.body.classList.remove("menu-open");
  }
});

window.addEventListener("load", () => {
  revealOnScroll();
  highlightCurrentSection();
  updateScrollProgress();
});
