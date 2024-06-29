const { utils } = require("../middleware/utils");
const { productControllers } = require("../controllers/productControllers");

async function productRoutes(req, res) {
  const route = req.url;
  const id = route.split(":")[1];
  console.log(req.url, "\n", id);

  switch (req.url) {
    case "GET":
      if (route === "/api/products") {
        await productControllers.getAllProducts(req, res);
      } else if (route === `/api/products/:${id}`) {
        await productControllers.getProductById(req, res, id);
      }
      break;

    case "POST":
      if (route === "/api/products") {
        await productControllers.createProduct(req, res);
      }
      break;

    case "PATCH":
      if (id) {
        await productControllers.updateProduct(req, res, id);
      }
      break;

    case "DELETE":
      if (route === "/api/products") {
        await productControllers.getAllProducts(req, res);
      } else if (id) {
        res.end(JSON.stringify({ id, method: "delete" }));
      }
      break;

    default:
      console.table({ 404: "route not found" });
      {
      }
  }
}

module.exports = { productRoutes };
