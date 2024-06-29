const crypto = require("node:crypto");
const { db } = require("../connections/connectionSQL");
const { utils } = require("../middleware/utils");
const { encoding } = require("../middleware/encoding");

// let g = encoding("putz").cipher();
// let r = encoding(g).decipher();

function productModels() {
  return {
    findAllProducts: () => {
      return new Promise((resolve, reject) => {
        db.execute("SELECT * FROM geckos.customers").then(([data, fields]) => {
          resolve(data);
        });
      });
    },

    findProductById: (id) => {
      return new Promise((resolve, reject) => {
        db.execute("SELECT * FROM geckos.customers WHERE customerNumber = ?", [
          id,
        ]).then(([data, fields]) => {
          resolve(data[0]);
        });
      });
    },

    createNewProduct: (product) => {
      return new Promise((resolve, reject) => {
        const { firstName, lastName, phone } = product;
        const UUID = crypto.randomUUID();
        db.execute(
          "INSERT INTO customers (UUID,firstName, lastName, phone) VALUES (?,?,?,?)",
          [UUID, firstName, lastName, phone]
        ).then(([data, fields]) => {
          resolve(data);
        });
      });
    },

    updateNewProduct: (id, product) => {
      return new Promise((resolve, reject) => {
        const index = Data.findIndex((i) => i.id === id);
        Data[index] = { id, ...product };
        utils.writeDataToFile("../data.js", Data);
        resolve(Data[index]);
      });
    },
  };
}

module.exports = {
  productModels,
};
