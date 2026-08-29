/* =====================================
   EverClean Solutions Contact Forms
===================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     BOOKING CONFIRMATION MODAL
  ===================================== */

  const submitModal = document.getElementById("submitModal");
  const closeSubmit = document.getElementById("closeSubmit");
  const closeSubmitButton = document.getElementById("closeSubmitButton");


  /* =====================================
     OPEN MODAL
  ===================================== */

  const openModal = () => {

    if (!submitModal) return;

    submitModal.classList.add("active");

    // Prevent background scrolling
    document.body.classList.add("modal-open");
  };


  /* =====================================
     CLOSE MODAL
  ===================================== */

  const closeModal = () => {

    if (!submitModal) return;

    submitModal.classList.remove("active");

    // Allow background scrolling again
    document.body.classList.remove("modal-open");
  };


  /* =====================================
     CLOSE BUTTONS
  ===================================== */

  if (closeSubmit) {

    closeSubmit.addEventListener("click", closeModal);

  }


  if (closeSubmitButton) {

    closeSubmitButton.addEventListener("click", closeModal);

  }


  /* =====================================
     CLOSE WHEN CLICKING OUTSIDE MODAL
  ===================================== */

  if (submitModal) {

    submitModal.addEventListener("click", (event) => {

      if (event.target === submitModal) {

        closeModal();

      }

    });

  }


  /* =====================================
     CLOSE WITH ESCAPE KEY
  ===================================== */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      closeModal();

    }

  });


  /* =====================================
     HANDLE ALL CONTACT FORMS
  ===================================== */

  const forms = document.querySelectorAll(
    "form[data-contact-form]"
  );


  forms.forEach((form) => {

    form.addEventListener("submit", async (event) => {

      event.preventDefault();


      /* =====================================
         SUBMIT BUTTON
      ===================================== */

      const submitButton = form.querySelector(
        'button[type="submit"]'
      );


      const originalButtonText = submitButton
        ? submitButton.textContent
        : "";


      /* =====================================
         BASIC VALIDATION
      ===================================== */

      const nameInput = form.querySelector(
        'input[name="name"]'
      );

      const emailInput = form.querySelector(
        'input[name="email"]'
      );

      const phoneInput = form.querySelector(
        'input[name="phone"]'
      );

      const serviceInput = form.querySelector(
        'select[name="service"]'
      );

      const messageInput = form.querySelector(
        'textarea[name="message"]'
      );


      const name = nameInput
        ? nameInput.value.trim()
        : "";

      const email = emailInput
        ? emailInput.value.trim()
        : "";

      const phone = phoneInput
        ? phoneInput.value.trim()
        : "";

      const service = serviceInput
        ? serviceInput.value
        : "";

      const message = messageInput
        ? messageInput.value.trim()
        : "";


      /* =====================================
         REQUIRED FIELD CHECK
      ===================================== */

      if (!name || !email || !phone || !service || !message) {

        alert(
          "Please complete all required fields before sending your quote request."
        );

        return;
      }


      /* =====================================
         DISABLE BUTTON
      ===================================== */

      if (submitButton) {

        submitButton.disabled = true;

        submitButton.setAttribute(
          "aria-busy",
          "true"
        );

        submitButton.textContent = "Sending...";

      }


      /* =====================================
         FORM DATA
      ===================================== */

      const formData = new FormData(form);

      const endpoint = form.getAttribute("action");


      if (!endpoint) {

        alert(
          "The form could not be submitted. Please try again later."
        );

        if (submitButton) {

          submitButton.disabled = false;

          submitButton.removeAttribute(
            "aria-busy"
          );

          submitButton.textContent =
            originalButtonText;

        }

        return;
      }


      /* =====================================
         SEND TO FORMSPREE
      ===================================== */

      try {

        const response = await fetch(endpoint, {

          method: "POST",

          body: formData,

          headers: {
            "Accept": "application/json"
          }

        });


        /* =====================================
           SUCCESS
        ===================================== */

        if (response.ok) {

          // Clear the form
          form.reset();


          // Restore submit button
          if (submitButton) {

            submitButton.disabled = false;

            submitButton.removeAttribute(
              "aria-busy"
            );

            submitButton.textContent =
              originalButtonText;

          }


          // Show confirmation modal
          openModal();

        }


        /* =====================================
           FORMSPREE ERROR
        ===================================== */

        else {

          let errorMessage =
            "Unable to send your request. Please check your details and try again.";


          try {

            const data = await response.json();

            if (data && data.error) {

              errorMessage = data.error;

            }

          } catch (error) {

            // Ignore JSON parsing errors

          }


          alert(errorMessage);


          if (submitButton) {

            submitButton.disabled = false;

            submitButton.removeAttribute(
              "aria-busy"
            );

            submitButton.textContent =
              originalButtonText;

          }

        }

      }


      /* =====================================
         CONNECTION ERROR
      ===================================== */

      catch (error) {

        console.error(
          "Form submission error:",
          error
        );


        alert(
          "There was a problem sending your request. Please try again later."
        );


        if (submitButton) {

          submitButton.disabled = false;

          submitButton.removeAttribute(
            "aria-busy"
          );

          submitButton.textContent =
            originalButtonText;

        }

      }

    });

  });

});