const fs = require("node:fs").promises;
const crypto = require("node:crypto");
const path = require("node:path");

function logger(req, res, message) {
  const date = new Date();
  const id = crypto.randomUUID().substr(0, 8);

  const datetime = `${date.toLocaleDateString()}\t${date.toLocaleTimeString()}`;

  const errors = `${datetime}\t[id:${id}]\t${message}\n`;

  const events = `${datetime}\t[id:${id}]\t${req.method}\t${req.url}`;

  const location = path.join(__dirname, "..", "logs");

  return {
    errorLogs: async () => {
      await fs.appendFile(`${location}/errorLogs.txt`, errors, "utf-8");
    },
    eventLogs: async () => {
      await fs.appendFile(`${location}/eventLogs.txt`, events, "utf-8");
    },
  };
}

module.exports = { logger };
