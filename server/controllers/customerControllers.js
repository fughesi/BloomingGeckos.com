const crypto = require("node:crypto");
const { utils } = require("../middleware/utils");
const { db } = require("../connections/connectionSQL");
const { validate } = require("../middleware/validate");
const { encoding } = require("../middleware/encoding");

function customerControllers(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all connections

  return {
    // GET /api/customer
    getAllCustomers: async () => {
      try {
        const customers = await db("SELECT * FROM customer").query();
        let result = customers || {
          message: "sorry, no customers retrieved from database",
        };
        res.end(JSON.stringify(result));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error }));
      }
    },

    // GET /api/customer/:id
    getCustomerById: async (id) => {
      try {
        const customer = await db(
          "SELECT * FROM customer WHERE id = ?"
        ).queryWithArgs(id);
        let result = customer || {
          message: "sorry, no customer retrieved from database with that id",
        };
        res.end(JSON.stringify(result));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error }));
      }
    },

    // POST /api/customers
    createCustomer: async () => {
      // get the information from the form
      const { firstName, lastName, email, salutation, password } = JSON.parse(
        await utils().getBodyData(req)
      );

      // validate all fields
      validate("firstName", firstName) || "first name field not valid";
      validate("lastName", lastName) || "last name field not valid";
      validate("email", email) || "email field not valid";
      validate("password", password) || "password field not valid";

      // format all valid fields and prep for db
      const encryptedPassword = encoding(password).cipher();
      const uuid = crypto.randomUUID();

      db(
        "INSERT INTO customer (id, first_name, last_name, uuid, salutation, password, email) VALUES (default,?,?,?,?,?,?)"
      )
        .queryWithArgs(
          firstName,
          lastName,
          uuid,
          salutation,
          encryptedPassword,
          email
        )
        .then(async () => {
          // get id from customer to enter into phone_numbers table
          const customerIDquery = await db(
            "SELECT id FROM customer WHERE uuid = ?"
          ).queryWithArgs(uuid);

          customerIDquery.at(0)
            ? // populate phone_numbers table if customer_id success
              db(
                "INSERT INTO phone_numbers (customer_id, type, number, extension) VALUES (?,?,?,?)"
              ).queryWithArgs(
                customerIDquery.at(0)["id"],
                "mobile1",
                "123213322",
                "222"
              )
            : console.log("could not get customer_id for phone_numbers table");
        })
        .then(async () => {
          // return newly created customer to frontend
          const newCustomer = await db(
            "SELECT * FROM customer WHERE uuid = ?"
          ).queryWithArgs(uuid);
          res.statusCode = 201;
          res.end(JSON.stringify(newCustomer));
        })
        .catch((error) => {
          console.log(error);
          res.statusCode = 400;
          res.end(JSON.stringify({ error }));
        });
    },

    // PATCH /api/customers/:id
    updateCustomer: async (id) => {
      try {
        // check to see if customer exists
        const itemInDatabase = await db(
          "SELECT * FROM customer WHERE id = ?"
        ).queryWithArgs(id);

        itemInDatabase.at(0)
          ? res.end(JSON.stringify(itemInDatabase.at(0)))
          : console.log("Item not in database");
        // const body = await utils().getPostData(req);
        // const { title, description, price } = JSON.parse(body);
        // const user = {
        //   title: title || itemInDatabase.title,
        //   description: description || itemInDatabase.description,
        //   price: price || itemInDatabase.price,
        // };
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error }));
      }
    },

    // DELETE /api/customers/:id
    deleteCustomer: async (id) => {
      try {
        db("DELETE FROM customer WHERE id = ?").queryWithArgs(id);
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error }));
      }
    },
  };
}

module.exports = {
  customerControllers,
};
