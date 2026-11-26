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

 // Google Sheets form submission
document.querySelectorAll("form[data-google-form]").forEach(form => {
  form.addEventListener("submit", async event => {
    event.preventDefault();

    const message = form.querySelector(".form-message");
    const submitButton = form.querySelector('button[type="submit"]');
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwHJnI9dWPtM3XCDJp5IxflqDaDhoTifRIv67Jxo0tq5CIccGoOwhWQgKLn5H_nn8Ra/exec";

    const formData = new FormData(form);
    formData.append("formType", form.dataset.formType);

    if (submitButton) {
      if (!submitButton.dataset.originalText) {
        submitButton.dataset.originalText =
          submitButton.textContent.trim();
      }

      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";
    }

    if (message) {
      message.hidden = true;
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: new URLSearchParams(formData),
        mode: "no-cors"
      });

      if (message) {
        message.textContent =
          "Thank you! Your submission has been sent.";
        message.hidden = false;
      }

      form.reset();

    } catch (error) {
      console.error("Submission error:", error);

      if (message) {
        message.textContent =
          "Submission failed. Please try again.";
        message.hidden = false;
      }

    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent =
          submitButton.dataset.originalText;
      }
    }
  });
});{
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
