//
//
// const { id, first_name, last_name, email, gender, password } = JSON.parse(
//   await utils().getBodyData(req)
// );
//
//
// let allFieldsTrue = [
//   typeof id == "number",
//   typeof first_name == "string",
//   first_name.length > 0,
//   typeof last_name == "string",
//   last_name.length > 0,
//   typeof email == "string",
//   email.length > 0,
//   typeof gender == "string",
//   gender.length == 1,
// ].every(Boolean); //verify complete
//
// if (!allFieldsTrue) {
//   res.statusCode = 400;
//   res.end(
//     JSON.stringify({
//       message: "All form fields must be complete to process this request",
//     })
//   );
// }

function validate(bodyData) {
  return {
    name(data) {
      [typeof data === String(), data.length > 3].every(Boolean);
      console.log(data, "\n", this);
      return this;
    },
  };
}

validate("bodyData").name("steven");

module.exports = { validate };
