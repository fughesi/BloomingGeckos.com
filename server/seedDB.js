const { db } = require("./connection");

return new Promise((resolve, reject) => {
  const firstName = ["frankie", "timmy", "girtrude", "manuel"];
  const lastName = ["benjamin", "booker", "pueblo", "diaz"];
  const phone = ["5551212", "4849022234", "9873491922", "6019045331"];

  db.execute(
    "INSERT INTO customers (firstName, lastName, phone) VALUES (?,?,?),(?,?,?),(?,?,?),(?,?,?)",
    [
      firstName[0],
      lastName[0],
      phone[0],
      firstName[1],
      lastName[1],
      phone[1],
      firstName[2],
      lastName[2],
      phone[2],
      firstName[3],
      lastName[3],
      phone[3],
    ]
  )
    .then(([data, fields]) => {
      resolve(data);
      console.log(data, fields);
    })
    .catch((err) => {
      reject(err);
    });
});
