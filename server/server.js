process.env.PORT = 5555;

const http = require("node:http");
const path = require("node:path");
const PORT = process.env.PORT || 5550;
const { products } = require("./controllers/productsController");
const { utils } = require("./utils");

const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".bin": "application/octet-stream",
};

http
  .createServer(async (req, res) => {
    try {
      const params = req.url.match(/\/api\/products\/([0-9])+/);
      let filePath = "../client" + req.url;
      const id = req.url.split("/")[3];
      const route = req.url;

      if (filePath === "../client/") filePath = "../client/index.html";

      const extname = String(path.extname(filePath)).toLowerCase();
      const contentType = mimeTypes[extname] || "text/html";

      utils.serveFile(filePath, contentType, res);

      switch (req.method) {
        case "GET":
          if (route === "/api/products") {
            await products.getAllProducts(req, res);
          } else if (route === `/api/products/${id}`) {
            await products.getProductById(req, res, id);
          }
          break;

        case "POST":
          if (route === "/api/products") {
            await products.createProduct(req, res, id);
          }
          break;

        case "PATCH":
          if (params) {
            await products.updateProduct(req, res, id);
          }
          break;

        case "DELETE":
          if (route === "/api/products") {
            await products.getAllProducts(req, res);
          } else if (params) {
            res.end(JSON.stringify({ params, id, method: "delete" }));
          }
          break;

        default:
          console.table({ 404: "route not found" });
      }
    } catch (error) {
      console.table({ error });
    }
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
