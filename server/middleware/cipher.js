const crypto = require("node:crypto");

function encoding(string) {
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
}

module.exports = { encoding };
