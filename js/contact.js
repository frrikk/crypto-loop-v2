/* Feedback from Erik Solhaug regarding contact form:
For the contact form, you need to return true for it to submit whenever you have successfully validated it, 
so the POST method can execute. You are also referring to some methods twice. 
If you are doing so, you should immediately put them in a variable you can reuse. 
*/

const form = document.querySelector("#contactForm");
const fullName = document.querySelector("#fullName");
const fullNameError = document.querySelector("#fullNameError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const address = document.querySelector("#address");
const addressError = document.querySelector("#addressError");
const fullFormValidation = document.querySelector(".formValidation");

const validateForm = (event) => {
  event.preventDefault();

  const stylesInForm = [
    {
      border: "2px solid  rgb(0, 255, 110)",
      background: "rgba(0, 255, 110,.1)",
    },
    {
      border: "2px solid rgb(255, 12, 60)",
      background: "rgba(255, 12, 60, .1)",
    },
  ];

  checkLength(fullName.value, 0)
    ? ((fullNameError.style.display = "none"),
      (fullName.style.border = stylesInForm[0].border),
      (fullName.style.backgroundColor = stylesInForm[0].background))
    : ((fullNameError.style.display = "block"),
      (fullName.style.border = stylesInForm[1].border),
      (fullName.style.backgroundColor = stylesInForm[1].background));

  checkLength(subject.value, 10)
    ? ((subjectError.style.display = "none"),
      (subject.style.border = stylesInForm[0].border),
      (subject.style.backgroundColor = stylesInForm[0].background))
    : ((subjectError.style.display = "block"),
      (subject.style.border = stylesInForm[1].border),
      (subject.style.backgroundColor = stylesInForm[1].background));

  checkLength(address.value, 25)
    ? ((addressError.style.display = "none"),
      (address.style.border = stylesInForm[0].border),
      (address.style.backgroundColor = stylesInForm[0].background))
    : ((addressError.style.display = "block"),
      (address.style.border = stylesInForm[1].border),
      (address.style.backgroundColor = stylesInForm[1].background));

  validateEmail(email.value, 25)
    ? ((emailError.style.display = "none"),
      (email.style.border = stylesInForm[0].border),
      (email.style.backgroundColor = stylesInForm[0].background))
    : ((emailError.style.display = "block"),
      (email.style.border = stylesInForm[1].border),
      (email.style.backgroundColor = stylesInForm[1].background));

  // Checks if whole form is a success

  checkLength(fullName.value, 0) &&
  checkLength(address.value, 25) &&
  checkLength(subject.value, 10) &&
  validateEmail(email.value)
    ? ((fullFormValidation.style.display = "block"),
      setTimeout(() => {
        form.reset();
        fullFormValidation.style.display = "none";
        location.reload();
      }, 2500))
    : (fullFormValidation.style.display = "none");
};

const checkLength = (value, len) => {
  if (value.trim().length > len) {
    return true;
  }
};

const validateEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
};

form.addEventListener("submit", validateForm);
