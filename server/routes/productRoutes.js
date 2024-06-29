const { productControllers } = require("../controllers/productControllers");

async function productRoutes(req, res) {
  const id = req.url.split("/")[3];

  switch (String(req.method).toUpperCase()) {
    case "GET":
      if (id) {
        await productControllers(req, res).getProductById(id);
      } else {
        await productControllers(req, res).getAllProducts();
      }
      break;

    case "POST":
      await productControllers(req, res).createProduct();
      break;

    case "PATCH":
      if (id) {
        await productControllers(req, res).updateProduct(id);
      }
      break;

    case "DELETE":
      if (id) {
        res.end(JSON.stringify({ id, method: "delete" }));
      } else {
        await productControllers(req, res).getAllProducts();
      }
      break;

    default:
      console.table({ 404: "route not found" });
  }
}

module.exports = { productRoutes };
