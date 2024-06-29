const fs = require("node:fs");

function utils() {
  return {
    writeDataToFile: (filename, content) => {
      fs.writeFile(filename, JSON.stringify(content), "utf-8", (error) => {
        if (error) throw new Error("failed to write data to file");
      });
    },

    getBodyData: (req) => {
      return new Promise((resolve, reject) => {
        try {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            resolve(body);
          });
        } catch (error) {
          reject("failed to get data from body\n", error);
        }
      });
    },

    serveFile: (filePath, contentType, res) => {
      fs.readFile(filePath, (err, content) => {
        if (err) {
          if (err?.code !== "ENOENT") {
            res.writeHead(500);
            res.end(`Server Error: ${err?.code}`);
          }
        } else {
          res.writeHead(200, { "Content-Type": contentType });
          res.end(content, "utf-8");
        }
      });
    },
  };
}

module.exports = { utils };
