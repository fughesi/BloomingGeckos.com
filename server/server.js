const http = require("node:http");
const path = require("node:path");
const PORT = process.env.PORT || 5550;
const { middleware } = require("./utils/middleware");
const { productRoutes } = require("./routes/productRoutes");
const { customerRoutes } = require("./routes/customerRoutes");

http
  .createServer(async (req, res) => {
    try {
      const endpoint = req.url;
      const extension = path.extname(endpoint).toLowerCase();

      const mimetypes = {
        ".css": "text/css",
        ".js": "text/javascript",
        ".html": "text/html",
        ".json": "application/json",
        ".ico": "image/x-icon",
        ".png": "image/png",
        ".jpeg": "image/jpeg",
        ".jpg": "image/jpeg",
        ".mp4": "video/mp4",
        ".svg": "image/svg+xml",
        ".webp": "image/webp",
        ".woff": "font/woff",
        ".rtf": "application/rtf",
        ".gif": "image/gif",
        ".bin": "application/octet-stream",
      };

      let contentType = mimetypes[extension] || "text/html";

      let file = path.join(__dirname, "..", "client", endpoint);

      if (file === "../client/") file = "../client/index.html";

      const pages = [
        "/",
        "/availability",
        "/contact",
        "/terms",
        "/home",
        "/care",
      ];

      if (pages.indexOf(endpoint) > -1)
        // redirects to index on refresh so router.js can navigate
        file = path.join(__dirname, "..", "client", "index.html");

      if (req.headers["content-type"] === "application/json") {
        // API endpoints
        // aboutController(req, res).about();
        console.log("thing");
      } else {
        // static files
        middleware().serveFile(file, contentType, res);
      }
    } catch (error) {
      // middleware().logger(req, res, error).errorLogs();
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end(error.message);
    }
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
