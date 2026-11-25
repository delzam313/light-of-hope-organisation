// Shared navigation, footer year and demo form handling.
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  document.querySelectorAll("form[data-demo-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const message = form.querySelector(".form-message");
      if (message) {
        message.textContent = "Thank you. This is a front-end demonstration: connect a secure form service or backend before collecting real submissions.";
        message.hidden = false;
      }
      form.reset();
    });
  });
});

// Donation amount selector
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("[data-amount]");
  const input = document.querySelector("#donation-amount");
  buttons.forEach(button => button.addEventListener("click", () => {
    buttons.forEach(item => item.classList.remove("selected"));
    button.classList.add("selected");
    if (input) input.value = button.dataset.amount;
  }));
});

// Accessible gallery lightbox
document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = lightbox?.querySelector("img");
  if (!lightbox || !lightboxImage) return;
  document.querySelectorAll("[data-lightbox]").forEach(image => {
    image.addEventListener("click", () => {
      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add("open");
    });
  });
  lightbox.querySelector("button").addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) lightbox.classList.remove("open");
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") lightbox.classList.remove("open");
  });
});
