const http = require("node:http");
const path = require("node:path");
const PORT = process.env.PORT || 5550;
const { utils } = require("./middleware/utils");
const { logger } = require("./middleware/logger");
const { productRoutes } = require("./routes/productRoutes");

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
      let filePath = "../client" + req.url;
      if (filePath === "../client/") filePath = "../client/index.html";

      const id = req.url.split(":")[1];
      const route = req.url;
      const extname = String(path.extname(filePath)).toLowerCase();
      const contentType = mimeTypes[extname] || "text/html";

      utils.serveFile(filePath, contentType, res);

      if (route == "/api/products") productRoutes(req, res, id);
      if (route == "/api/users") userRoutes(req, res, id);

      // res.writeHead(404, { "Content-Type": "application/json" });
      // res.end({ error: "route not found" });

      // switch (req.method) {
      //   case "GET":
      //     if (route === "/api/products") {
      //       await products.getAllProducts(req, res);
      //     } else if (route === `/api/products/:${id}`) {
      //       await products.getProductById(req, res, id);
      //     }
      //     break;
      //
      //   case "POST":
      //     if (route === "/api/products") {
      //       await products.createProduct(req, res);
      //     }
      //     break;
      //
      //   case "PATCH":
      //     if (id) {
      //       await products.updateProduct(req, res, id);
      //     }
      //     break;
      //
      //   case "DELETE":
      //     if (route === "/api/products") {
      //       await products.getAllProducts(req, res);
      //     } else if (id) {
      //       res.end(JSON.stringify({ id, method: "delete" }));
      //     }
      //     break;
      //
      //   default:
      //     console.table({ 404: "route not found" });
      // }
    } catch (error) {
      logger(req, res, error).errorLogs();
      console.log(error);
    }
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
