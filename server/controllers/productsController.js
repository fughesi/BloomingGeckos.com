const Data = require("../models/productsModel");
const { getPostData } = require("../utils");

// GET "/api/products"
const getAllProducts = async (req, res) => {
  try {
    const result = await Data.findAllProducts();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
};

// GET "/api/product/:id"
const getProductById = async (req, res, id) => {
  try {
    const result = await Data.findProductById(String(id));

    if (!result) {
      console.log("not found");
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    }
  } catch (error) {
    console.log(error);
  }
};

// POST "/api/product"
const createProduct = async (req, res) => {
  try {
    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);

    const product = {
      title,
      description,
      price,
    };

    const newProduct = await Data.createNewProduct(product);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
};

// PATCH "/api/product/:id"
const updateProduct = async (req, res, id) => {
  try {
    const itemInDatabase = await Data.findProductById(String(id));

    if (!itemInDatabase) {
      console.log("error");
    }

    const body = await getPostData(req);

    const { title, description, price } = JSON.parse(body);

    const product = {
      title: title || Data.title,
      description: description || Data.description,
      price: price || Data.price,
    };

    const revisedProduct = await Data.updateNewProduct(id, product);

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(revisedProduct));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
