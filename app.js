const renderAlert = (state = "error") => {
  const messages = {
    error: "<b>Please provide a valid email address</b>",
    success: "<b>Yay, we just send you a email!</b>",
  };

  return `
  <p class="alert" data-state="${state}">${messages[state]}</p>
  `;
};

const init = () => {
  const emailElement = document.querySelector("#email");
  const formElement = document.querySelector("#form");
  const errorMsg = document.querySelector(".error-msg");
  const validationRegex = new RegExp(
    emailElement.getAttribute("patern") || "[^@]+@[^.]+..+",
    "i",
  );

  emailElement.removeAttribute("required");
  emailElement.removeAttribute("patern");
  formElement.setAttribute("novalidate", "");

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!validationRegex.test(emailElement.value.trim())) {
      errorMsg.innerHTML = renderAlert("error");
      emailElement.classList.add("error");
      emailElement.setAttribute("aria-invalid", "true");
      return;
    }

    formElement.parentElement.removeChild(emailElement);
    errorMsg.innerHTML = renderAlert("success");
  });
};

init();