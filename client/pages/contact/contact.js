reset.addEventListener("click", () => sessionStorage.removeItem("contactForm"));

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const req = new Request("http://localhost:5555/api/products", {
    headers: {
      "content-type": "multipart/form-data",
    },
    mode: "cors",
    method: "POST",
    // body: new FormData(contactForm),
    body: { title: "blah", description: "stuff", price: 333 },
  });

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
