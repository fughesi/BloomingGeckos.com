const { utils } = require("../middleware/utils");
const { db } = require("../connections/connectionPG");
const { encoding } = require("../middleware/encoding");

function customerControllers(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all connections

  return {
    // GET /api/customer
    getAllCustomers: async () => {
      try {
        const customers = await db("SELECT * FROM customers").query();
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
          "SELECT * FROM customers WHERE id = $1"
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
      const { id, first_name, last_name, email, gender, password } = JSON.parse(
        await utils().getBodyData(req)
      );

      const encryptedPassword = encoding(password).cipher();

      let allFieldsTrue = [
        typeof id == "number",
        typeof first_name == "string",
        first_name.length > 0,
        typeof last_name == "string",
        last_name.length > 0,
        typeof email == "string",
        email.length > 0,
        typeof gender == "string",
        gender.length == 1,
      ].every(Boolean); //verify complete

      if (!allFieldsTrue) {
        res.statusCode = 400;
        res.end(
          JSON.stringify({
            message: "All form fields must be complete to process this request",
          })
        );
      }

      db("INSERT INTO customers VALUES ($1, $2, $3, $4, $5, $6)")
        .queryWithArgs(
          id,
          first_name,
          last_name,
          email,
          gender,
          encryptedPassword
        )
        .then(async () => {
          const newCustomer = await db(
            "SELECT * FROM customers WHERE id = $1"
          ).queryById(id);

          res.statusCode = 201;
          res.end(JSON.stringify(newCustomer));
        })
        .catch((error) => {
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
