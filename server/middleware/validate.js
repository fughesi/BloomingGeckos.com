function validate(field = "", value = "") {
  const preparedField = field.trim().toString();
  const preparedValue = value.trim().toString();

  options = {
    max: 1000,
    min: 1,
    ...arguments[2],
  };

  const regex = {
    firstName: /^[a-z\d]{1,20}$/i,
    lastName: /^[a-z\d]{1,50}$/i,
    username: /^[a-z\d]{5,12}$/i,
    password: /^[\w@-]{8,20}$/,
    phone: /^\d{7,15}$/,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
    address: /^[\w\d]{7,15}$/i,
    city: /^[\w\d]{7,15}$/i, // needs work
    state: /^[a-z]{2}$/i,
    notValid: "value not contained in regex table",
  };

  return regex[field]
    ? console.log(
        [
          regex[preparedField]?.test(preparedValue),
          preparedValue.length >= options.min,
          preparedValue.length <= options.max,
        ].every(Boolean)
      )
    : console.log(regex["notValid"]);
}

module.exports = { validate };
