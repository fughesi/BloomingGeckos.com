const { product_models } = require("../models/productsModel");
const { utils } = require("../middleware/utils");

const products = {
  // GET /api/product
  getAllProducts: async (req, res) => {
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Origin": "http://127.0.0.1:8080",
    });
    res.end(JSON.stringify(await product_models.findAllProducts()));
  },

  // GET /api/product/:id
  getProductById: async (req, res, id) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(await product_models.findProductById(String(id))));
  },

  // POST /api/product
  createProduct: async (req, res) => {
    try {
      const body = await utils.getPostData(req);

      const { title, description, price } = body;

      const product = {
        title,
        description,
        price,
      };

      res.writeHead(201, { "Content-Type": "application/json" });
      return res.end(
        JSON.stringify(await product_models.createNewProduct(product))
      );
    } catch (err) {
      console.log(err, "tiddies");
    }
  },

  // PATCH /api/product/:id
  updateProduct: async (req, res, id) => {
    const itemInDatabase = await product_models.findProductById(String(id));

    if (!itemInDatabase) console.log("error");

    const body = await utils.getPostData(req);

    const { title, description, price } = JSON.parse(body);

    const product = {
      title: title || itemInDatabase.title,
      description: description || itemInDatabase.description,
      price: price || itemInDatabase.price,
    };

    res.writeHead(200, { "Content-Type": "application/json" });

    return res.end(
      JSON.stringify(await product_models.updateNewProduct(id, product))
    );
  },
};

module.exports = {
  products,
};
