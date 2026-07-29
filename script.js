/* ============================
   Sunaina Enterprises
   Premium JavaScript - ENHANCED
============================ */

// ==================== LOADING SCREEN ====================

window.addEventListener("load", () => {
  const loader = document.getElementById("loadingOverlay");
  
  if (loader) {
    // Add slight delay for better UX
    setTimeout(() => {
      loader.style.opacity = "0";
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }, 800);
  }
});


// ==================== MOBILE MENU TOGGLE ====================

const menuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    
    // Animate menu button
    menuBtn.style.transform = mobileNav.classList.contains("active") 
      ? "rotate(90deg)" 
      : "rotate(0deg)";
  });
}

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (mobileNav && mobileNav.classList.contains("active")) {
    if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
      mobileNav.classList.remove("active");
      if (menuBtn) {
        menuBtn.style.transform = "rotate(0deg)";
      }
    }
  }
});


// ==================== STICKY HEADER ====================

const header = document.getElementById("siteHeader");
let lastScrollY = 0;

if (header) {
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 80) {
      header.classList.add("sticky");
    } else {
      header.classList.remove("sticky");
    }
    
    lastScrollY = currentScrollY;
  });
}


// ==================== SMOOTH SCROLL ====================

const links = document.querySelectorAll('a[href^="#"]');

links.forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    
    // Don't prevent default for anchor-only links
    if (href === "#") return;
    
    e.preventDefault();

    const target = document.querySelector(href);

    if (target) {
      // Close mobile menu if open
      if (mobileNav && mobileNav.classList.contains("active")) {
        mobileNav.classList.remove("active");
        if (menuBtn) {
          menuBtn.style.transform = "rotate(0deg)";
        }
      }

      // Smooth scroll to target
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// ==================== DARK MODE ====================

const darkBtn = document.getElementById("darkToggle");
const DARK_MODE_KEY = "sunaina-theme";

// Initialize dark mode from localStorage
function initializeDarkMode() {
  const savedTheme = localStorage.getItem(DARK_MODE_KEY);
  
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    if (darkBtn) {
      darkBtn.innerHTML = "☀️";
    }
  } else {
    document.body.classList.remove("dark-mode");
    if (darkBtn) {
      darkBtn.innerHTML = "🌙";
    }
  }
}

// Toggle dark mode
if (darkBtn) {
  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");
    
    darkBtn.innerHTML = isDarkMode ? "☀️" : "🌙";
    localStorage.setItem(DARK_MODE_KEY, isDarkMode ? "dark" : "light");
    
    // Add animation
    darkBtn.style.transform = "rotate(180deg)";
    setTimeout(() => {
      darkBtn.style.transform = "rotate(0deg)";
    }, 300);
  });
}

// Initialize theme on page load
initializeDarkMode();


// ==================== SCROLL ANIMATIONS ====================

// Animate elements when they come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe glass cards and images
document.querySelectorAll(".glass, .about-image, .service-image").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "all .6s ease-out";
  observer.observe(el);
});


// ==================== FORM VALIDATION (Optional) ====================

// If you add a contact form, uncomment and use this
/*
const contactForm = document.querySelector("form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Basic validation
    let isValid = true;
    for (let [key, value] of formData.entries()) {
      if (!value.trim()) {
        isValid = false;
        break;
      }
    }
    
    if (isValid) {
      console.log("Form submitted:", Object.fromEntries(formData));
      alert("Thank you for contacting us!");
      contactForm.reset();
    } else {
      alert("Please fill all fields");
    }
  });
}
*/


// ==================== PERFORMANCE: Debounce Function ====================

function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
  console.log("Scroll optimized");
}, 100);

window.addEventListener("scroll", optimizedScroll);


// ==================== UTILITY: Get Element by ID ====================

function getById(id) {
  return document.getElementById(id);
}

function getByClass(className) {
  return document.querySelectorAll(className);
}


// ==================== CONSOLE MESSAGES ====================

console.log("%c🎉 Sunaina Enterprises Loaded Successfully!", "color: #0B3B8C; font-size: 16px; font-weight: bold;");
console.log("%cTheme: %s", "color: #C79C2B; font-weight: bold;", 
  document.body.classList.contains("dark-mode") ? "Dark" : "Light");