const crypto = require("node:crypto");
const { db } = require("../connections/connectionSQL");
const { utils } = require("../middleware/utils");
const { encoding } = require("../middleware/encoding");

function customerModels() {
  return {
    findAllCustomers: () => {
      return new Promise((resolve, reject) => {
        db.execute("SELECT * FROM geckos.customers").then(([data, fields]) => {
          resolve(data);
        });
      });
    },

    findCustomerById: (id) => {
      return new Promise((resolve, reject) => {
        db.execute("SELECT * FROM geckos.customers WHERE customerNumber = ?", [
          id,
        ]).then(([data, fields]) => {
          resolve(data[0]);
        });
      });
    },

    createNewCustomer: (customer) => {
      return new Promise((resolve, reject) => {
        const { firstName, lastName, phone, password } = customer;
        const UUID = crypto.randomUUID();
        const encryptedPassword = encoding(String(password)).cipher();
        db.execute(
          "INSERT INTO customers (UUID, firstName, lastName, password, phone) VALUES (?,?,?,?,?)",
          [UUID, firstName, lastName, encryptedPassword, phone]
        ).then(([data, fields]) => {
          resolve(data);
        });
      });
    },

    updateNewCustomer: (id, customer) => {
      return new Promise((resolve, reject) => {
        const index = Data.findIndex((item) => item.id === id);
        Data[index] = { id, ...customer };
        utils.writeDataToFile("../data.js", Data);
        resolve(Data[index]);
      });
    },
  };
}

module.exports = {
  customerModels,
};
