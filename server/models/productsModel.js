const { db } = require("../connections/connectionSQL");
const { utils } = require("../middleware/utils");
const { encoding } = require("../middleware/encoding");

// let g = encoding("putz").cipher();
// let r = encoding(g).decipher();

function productModels() {
  return {
    findAllProducts: () => {
      return new Promise((resolve, reject) => {
        db.execute("SELECT * FROM ninja_pizza.pizzas").then(
          ([data, fields]) => {
            console.log(encoding("password").cipher());
            resolve(data);
          }
        );
      });
    },

    findProductById: (id) => {
      return new Promise((resolve, reject) => {
        db.execute(
          "SELECT * FROM classicmodels.customers WHERE customerNumber = ?",
          [id]
        ).then(([data, fields]) => {
          resolve(data[0]);
        });
      });
    },

    createNewProduct: (product) => {
      return new Promise((resolve, reject) => {
        const firstName = "ginny";
        const lastName = "hooker";
        const phone = "6263349922";

        db.execute(
          "INSERT INTO customers (firstName, lastName, phone) VALUES (?,?,?)",
          [firstName, lastName, phone]
        ).then(([data, fields]) => {
          console.log(data, fields);
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
