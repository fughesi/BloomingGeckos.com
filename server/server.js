process.env.PORT = 5555;

const http = require("node:http");
const path = require("node:path");
const PORT = process.env.PORT || 5550;
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
} = require("./controllers/productsController");
const { serveFile } = require("./utils");

const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
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
  .createServer((req, res) => {
    const params = req.url.match(/\/api\/products\/([0-9])+/);
    let filePath = "../client" + req.url;
    const id = req.url.split("/")[3];
    const route = req.url;

    if (filePath === "../client/") {
      filePath = "../client/index.html";
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || "text/html";

    serveFile(filePath, contentType, res);
    console.log(req.method, req.url);

    switch (req.method) {
      case "GET":
        if (route === "/api/products") {
          getAllProducts(req, res);
        } else if (route === `/api/products/${id}`) {
          getProductById(req, res, id);
        }
        break;

      case "POST":
        if (route === "/api/products") {
          createProduct(req, res);
        }
        break;

      case "PATCH":
        if (params) {
          const id = req.url.split("/")[3];
          updateProduct(req, res, id);
        }
        break;

      case "DELETE":
        if (route === "/api/products") {
          getAllProducts(req, res);
        } else if (params) {
          const id = req.url.split("/")[3];

          res.end(JSON.stringify({ params, id, method: "delete" }));
        }
        break;

      default:
        console.log("route not found");
    }
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
