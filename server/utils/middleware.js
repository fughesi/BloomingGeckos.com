const fs = require("node:fs").promises;
const crypto = require("node:crypto");
const path = require("node:path");

function middleware() {
  return {
    encoding: (string) => {
      let secret_key = process.env.SECRET_KEY;
      let secret_iv = process.env.SECRET_IV;
      const algorithm = "aes-256-cbc";

      const key = crypto
        .createHash("sha512")
        .update(secret_key, "utf-8")
        .digest("hex")
        .substr(0, 32);
      const iv = crypto
        .createHash("sha512")
        .update(secret_iv, "utf-8")
        .digest("hex")
        .substr(0, 16);

      return {
        cipher: () => {
          const encode = crypto.createCipheriv(algorithm, key, iv);
          let encrypted = encode.update(string, "utf-8", "hex");
          encrypted += encode.final("hex");
          return encrypted;
        },
        decipher: () => {
          const decode = crypto.createDecipheriv(algorithm, key, iv);
          let decrypted = decode.update(string, "hex", "utf-8");
          decrypted += decode.final("utf-8");
          return decrypted;
        },
      };
    },

    validate: (field = "", value = "") => {
      const preparedField = field.trim().toString();
      const preparedValue = value.trim().toString();

      options = {
        max: 1000,
        min: 1,
        ...arguments[2],
      };

      const regex = {
        firstName: /^[a-z\d]{1,20}$/i,
        lastName: /^[a-z\d]{1,50}$/i,
        username: /^[a-z\d]{5,12}$/i,
        password: /^[\w@-]{8,20}$/,
        phone: /^\d{7,15}$/,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
        address: /^[\w\d]{7,15}$/i,
        city: /^[\w\d]{7,15}$/i, // needs work
        state: /^[a-z]{2}$/i,
        notValid: "value not contained in regex table",
      };

      return regex[preparedField]
        ? console.log(
            [
              regex[preparedField]?.test(preparedValue),
              preparedValue.length >= options.min,
              preparedValue.length <= options.max,
            ].every(Boolean)
          )
        : console.log(regex["notValid"]);
    },

    // function regex() {
    //   return {
    //     regexValidation: () => {
    //       // work in progress
    //       const patterns = {
    //         firstName: /^[a-z\d]{5,12}$/i,
    //         username: /^[a-z\d]{5,12}$/i,
    //         password: /^[\w@-]{8,20}$/,
    //         telephone: /^\d{11}$/,
    //         email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
    //       };
    //     },
    //   };
    // }

    logger: (req, res, message) => {
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
    },

    writeDataToFile: (filename, content) => {
      fs.writeFile(filename, JSON.stringify(content), "utf-8", (error) => {
        if (error) throw new Error("failed to write data to file");
      });
    },

    getBodyData: async (req) => {
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

    serveFile: async (file, contentType, res) => {
      try {
        const content = await fs.readFile(file);

        res.writeHead(200, {
          "Content-Type": contentType, // set MIME type
          "Access-Control-Allow-Origin": ["http://127.0.0.1:52237", "*"], // CORS
        });

        res.end(content, "utf-8");
      } catch (error) {
        error?.code !== "ENOENT"
          ? (res.writeHead(500), res.end(`Server Error: ${error}`))
          : (res.writeHead(404), res.end(`File not found: ${error}`));
      }
    },
  };
}

module.exports = { middleware };
