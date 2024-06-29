const { productModels } = require("../models/productModels");
const { utils } = require("../middleware/utils");

function productControllers(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all connections

  return {
    // GET /api/product
    getAllProducts: async () => {
      res.end(JSON.stringify(await productModels().findAllProducts()));
    },

    // GET /api/product/:id
    getProductById: async (id) => {
      try {
        res.end(
          JSON.stringify(await productModels().findProductById(String(id)))
        );
      } catch (error) {
        res.setHeader = 404;
        res.end({ error: "id of thingy not found" });
      }
    },

    // POST /api/product
    createProduct: async (id) => {
      const body = await utils().getBodyData(req);
      res.statusCode = 201;
      await productModels().createNewProduct(JSON.parse(body));
      res.end(JSON.stringify(await productModels().findAllProducts()));
    },

    // PATCH /api/product/:id
    updateProduct: async (id) => {
      const itemInDatabase = await productModels().findProductById(String(id));
      if (!itemInDatabase) throw new Error("Item not in database");
      const body = await utils().getPostData(req);
      const { title, description, price } = JSON.parse(body);
      const product = {
        title: title || itemInDatabase.title,
        description: description || itemInDatabase.description,
        price: price || itemInDatabase.price,
      };
      res.end(
        JSON.stringify(await productModels().updateNewProduct(id, product))
      );
    },
  };
}

module.exports = {
  productControllers,
};
