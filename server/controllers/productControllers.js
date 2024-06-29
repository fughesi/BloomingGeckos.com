const { productModels } = require("../models/productsModel");
const { utils } = require("../middleware/utils");

function productControllers(req, res) {
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all connections

  return {
    // GET /api/product
    getAllProducts: async () => {
      res.end(JSON.stringify(await productModels.findAllProducts()));
    },

    // GET /api/product/:id
    getProductById: async (id) => {
      // res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(await productModels.findProductById(String(id))));
    },

    // POST /api/product
    createProduct: async () => {
      try {
        const body = await utils.getPostData(req);

        const { title, description, price } = body;

        const product = {
          title,
          description,
          price,
        };

        res.status(201);
        return res.end(
          JSON.stringify(await productModels.createNewProduct(product))
        );
      } catch (err) {
        console.log(err);
      }
    },

    // PATCH /api/product/:id
    updateProduct: async (id) => {
      const itemInDatabase = await productModels.findProductById(String(id));

      if (!itemInDatabase) console.log("error");

      const body = await utils.getPostData(req);

      const { title, description, price } = JSON.parse(body);

      const product = {
        title: title || itemInDatabase.title,
        description: description || itemInDatabase.description,
        price: price || itemInDatabase.price,
      };

      return res.end(
        JSON.stringify(await productModels.updateNewProduct(id, product))
      );
    },
  };
}

module.exports = {
  productControllers,
};
