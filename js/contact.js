/* =====================================
  EverClean Solutions Contact Form
===================================== */

const submitModal = document.getElementById("submitModal");
const closeSubmit = document.getElementById("closeSubmit");
const closeSubmitButton = document.getElementById("closeSubmitButton");

const closeModal = (modal) => {
  if (modal) {
    modal.classList.remove("active");
  }
};

if (closeSubmit) {
  closeSubmit.onclick = () => closeModal(submitModal);
}

if (closeSubmitButton) {
  closeSubmitButton.onclick = () => closeModal(submitModal);
}

if (submitModal) {
  submitModal.onclick = (e) => {
    if (e.target === submitModal) {
      closeModal(submitModal);
    }
  };
}

const handleFormSubmission = (form) => {
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const phone = form.querySelector('input[name="phone"]').value.trim();
    const service = form.querySelector('select[name="service"]').value;
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !phone || !service) {
      alert("Please complete all required fields before sending your quote request.");
      return;
    }

    const formData = new FormData(form);
    const endpoint = form.getAttribute("action");

    fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          if (submitModal) {
            submitModal.classList.add("active");
          } else {
            alert("Thanks. Your quote request has been sent.");
          }
          form.reset();
        } else {
          return response.json().then((data) => {
            const errorMessage = data.error || "Unable to submit the form. Please try again.";
            alert(errorMessage);
          });
        }
      })
      .catch(() => {
        alert("There was a problem sending your request. Please try again later.");
      });
  });
};

document.querySelectorAll("form[data-contact-form]").forEach(handleFormSubmission);
