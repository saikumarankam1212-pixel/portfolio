$(document).ready(function () {

  //sticky header
  $(window).scroll(function () {
    updateActiveSection();
  });

  $(".navbar a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0
        },
        500
      );
    } else {
      const headerHeight = $(".header-area").outerHeight();
      var offset = $(target).offset().top - headerHeight;

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500
      );
    }

    $(".navbar a").removeClass("active");
    $(this).addClass("active");
  });

  // --- Hamburger Menu Logic ---
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('.main-nav');

  navToggle.addEventListener('click', () => {
      const isVisible = primaryNav.getAttribute('data-visible') === 'true';
      primaryNav.setAttribute('data-visible', !isVisible);
      navToggle.setAttribute('aria-expanded', !isVisible);
  });

  primaryNav.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
          primaryNav.setAttribute('data-visible', false);
          navToggle.setAttribute('aria-expanded', false);
      }
  });

  // --- Theme Switcher Logic ---
  const themeToggleButton = document.getElementById('theme-toggle-btn');
  const body = document.body;

  const applyTheme = (theme) => {
    body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  };

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
      const newTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  // ScrollReveal
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });

  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });

  ScrollReveal().reveal(".project-title, .contact-title, .skills-title, .frameworks-title", {
    origin: "top"
  });

  ScrollReveal().reveal(".projects, .contact, .skills-content, .frameworks-content", {
    origin: "bottom"
  });

  // Animate progress bars
  const skillsSection = document.getElementById('MySkills');
  const progressBars = document.querySelectorAll('.progress-bar span');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-width');
          bar.style.width = targetWidth;
        });
        observer.unobserve(skillsSection);
      }
    });
  }, {
    threshold: 0.5
  });

  observer.observe(skillsSection);
});

function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();
  const headerHeight = $(".header-area").outerHeight();

  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  $("section").each(function () {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - headerHeight &&
      scrollPosition < offset + height - headerHeight
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}

/* ===== Typing Effect ===== */

const nameText = "Ankam Sai Kumar";   // ✅ Updated Name
let index = 0;
const typingSpeed = 110;

function typeName() {
  if (index < nameText.length) {
    document.getElementById("typing-name").innerHTML += nameText.charAt(index);
    index++;
    setTimeout(typeName, typingSpeed);
  }
}

window.addEventListener("load", function () {
  setTimeout(typeName, 1200);
});
