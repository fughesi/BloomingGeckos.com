const http = require("node:http");
const path = require("node:path");
const PORT = process.env.PORT || 5550;
const { utils } = require("./middleware/utils");
const { logger } = require("./middleware/logger");
const { productRoutes } = require("./routes/productRoutes");
const { customerRoutes } = require("./routes/customerRoutes");

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

      const extname = String(path.extname(filePath)).toLowerCase();
      const contentType = mimeTypes[extname] || "text/html";

      utils().serveFile(filePath, contentType, res);

      if (/\/api\/products[/]?(\w+)?/i.test(req.url)) productRoutes(req, res);
      if (/\/api\/customers[/]?(\w+)?/i.test(req.url)) customerRoutes(req, res);
    } catch (error) {
      logger(req, res, error).errorLogs();
      console.log(error);
    }
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
