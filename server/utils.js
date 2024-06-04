const fs = require("node:fs");

const writeDataToFile = (filename, content) => {
  fs.writeFile(filename, JSON.stringify(content), "utf-8", (error) => {
    // fs.writeFileSync(filename, JSON.stringify(content), "utf-8", (error) => {
    if (error) {
      console.log(error);
    }
  });
};

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req
        .on("data", (chunk) => {
          body += chunk.toString();
        })
        .on("end", async () => {
          resolve(body);
        });
    } catch (error) {
      reject(error);
    }
  });
};

const serveFile = (filePath, contentType, res) => {
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
};

module.exports = { writeDataToFile, getPostData, serveFile };
