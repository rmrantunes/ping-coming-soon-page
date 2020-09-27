const renderAlert = (state = "error") => {
  const messages = {
    error: "<b>Please provide a valid email address</b>",
    success: "<b>Yay, we just send you an email!</b>",
    empty: "<b>Whoops! It looks like you forgot to add your email</b>",
  };

  return `
  <p class="error-msg" data-state="${state}">${messages[state]}</p>
  `;
};

const init = () => {
  const emailElement = document.querySelector("#email");
  const buttonElement = document.querySelector("#main-button");
  const formElement = document.querySelector("#form");
  const alertElement = document.querySelector('[role="alert"]');
  const validationRegex = new RegExp(
    emailElement.getAttribute("pattern") || "[^@]+@[^.]+..+",
    "i",
  );

  emailElement.removeAttribute("required");
  emailElement.removeAttribute("pattern");
  formElement.setAttribute("novalidate", "");

  formElement.addEventListener("submit", (event) => {
    if (emailElement.value == "") {
      alertElement.innerHTML = renderAlert("empty");
    } else if (!validationRegex.test(emailElement.value.trim())) {
      event.preventDefault();
      alertElement.innerHTML = renderAlert("error");
      emailElement.classList.add("error");
      emailElement.setAttribute("aria-invalid", "true");
      return;
    } else {
      formElement.removeChild(emailElement);
      formElement.removeChild(buttonElement);
      alertElement.innerHTML = renderAlert("success");
    }
    event.preventDefault();
  });
};
init();
