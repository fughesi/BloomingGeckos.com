reset.addEventListener("click", () => sessionStorage.removeItem("contactForm"));

// create new customer form BEGIN ----
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const requestObj = Object.fromEntries(new FormData(contactForm));

  const headerObj = new Headers();
  headerObj.append("Content-Type", "application/json");

  const req = new Request("http://localhost:5555/api/customers");
  req.mode = "cors";
  req.method = "POST";
  req.headers = headerObj;
  req.body = JSON.stringify(requestObj);

  fetch(req)
    .then((res) => res.json())
    .then((data) => console.log(data));
});

contactForm.addEventListener("input", (e) => {
  const { firstName, lastName, email, phone, password } = contactForm;

  const savedInputData = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
  };

  sessionStorage.setItem("contactForm", JSON.stringify(savedInputData));
});

performance("contactForm").regexFormValidation();
// create new customer form END ----

(function () {
  const savedData = JSON.parse(sessionStorage.getItem("contactForm"));

  if (savedData) {
    contactForm.firstName.value = savedData.firstName ?? "";
    contactForm.lastName.value = savedData.lastName ?? "";
    contactForm.email.value = savedData.email ?? "";
    contactForm.phone.value = savedData.phone ?? "";
    contactForm.password.value = savedData.password ?? "";
  }
})();
