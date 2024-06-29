const { customerModels } = require("../models/customerModels");
const { utils } = require("../middleware/utils");

function customerControllers(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all connections

  return {
    // GET /api/customer
    getAllCustomers: async () => {
      res.end(JSON.stringify(await customerModels().findAllCustomers()));
    },

    // GET /api/customer/:id
    getCustomerById: async (id) => {
      res.end(
        JSON.stringify(await customerModels().findCustomerById(String(id)))
      );
    },

    // POST /api/customer
    createCustomer: async () => {
      const body = await utils().getBodyData(req);
      await customerModels().createNewCustomer(JSON.parse(body));
      res.statusCode = 201;
      return res.end(JSON.stringify(await customerModels().findAllCustomers()));
    },

    // PATCH /api/customer/:id
    updateCustomer: async (id) => {
      // const itemInDatabase = await productModels().findProductById(String(id));
      // if (!itemInDatabase) throw new Error("Item not in database");
      // const body = await utils().getPostData(req);
      // const { title, description, price } = JSON.parse(body);
      // const user = {
      //   title: title || itemInDatabase.title,
      //   description: description || itemInDatabase.description,
      //   price: price || itemInDatabase.price,
      // };
      // return res.end(
      //   JSON.stringify(await productModels().updateNewProduct(id, user))
      // );
    },
  };
}

module.exports = {
  customerControllers,
};
