const crypto = require("node:crypto");
const { utils } = require("../middleware/utils");
const { db } = require("../connections/connectionSQL");
const { validate } = require("../middleware/validate");
const { encoding } = require("../middleware/encoding");

function customerControllers(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all connections
  // res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET", "POST");

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

    // POST /api/customer
    createCustomer: async () => {
      // get the information from the form
      const { firstName, lastName, email, salutation, password } = JSON.parse(
        await utils().getBodyData(req)
      );
      // validate all fields
      validate(firstName).name().valid || "first name field not valid";
      validate(lastName).name().valid || "last name field not valid";
      validate(email).email().valid || "email field not valid";
      validate(password).password().valid || "password field not valid";

      // if (!allFieldsTrue) {
      //   res.statusCode = 400;
      //   res.end(
      //     JSON.stringify({
      //       message: "All form fields must be complete to process this request",
      //     })
      //   );
      // }

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
          // return newly created customer to frontend
          const newCustomer = await db(
            "SELECT * FROM customer WHERE uuid = ?"
          ).queryWithArgs(uuid);
          console.log(newCustomer);
          res.statusCode = 201;
          res.end(JSON.stringify(newCustomer));
        })
        .catch((error) => {
          console.log(error);
          res.statusCode = 400;
          res.end(JSON.stringify({ error }));
        });
    },

    // PATCH /api/customer/:id
    updateCustomer: async (id) => {
      try {
        // const itemInDatabase = await productModels().findProductById(String(id));
        // if (!itemInDatabase) throw new Error("Item not in database");
        // const body = await utils().getPostData(req);
        // const { title, description, price } = JSON.parse(body);
        // const user = {
        //   title: title || itemInDatabase.title,
        //   description: description || itemInDatabase.description,
        //   price: price || itemInDatabase.price,
        // };
        // res.end(
        //   JSON.stringify(await productModels().updateNewProduct(id, user))
        // );
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
