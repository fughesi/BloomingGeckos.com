const { db } = require("../connection");
const { writeDataToFile } = require("../utils");

const findAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.execute("SELECT * FROM ninja_pizza.pizzas")
      .then(([data, fields]) => {
        console.log(data);
        resolve(data);
      })
      .catch((err) => console.log(err));
  });
};

const findProductById = (id) => {
  return new Promise((resolve, reject) => {
    db.execute(
      "SELECT * FROM classicmodels.customers WHERE customerNumber = ?",
      [id]
    )
      .then(([data, fields]) => {
        resolve(data[0]);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const createNewProduct = (product) => {
  return new Promise((resolve, reject) => {
    const firstName = "ginny";
    const lastName = "hooker";
    const phone = "6263349922";

    db.execute(
      "INSERT INTO customers (firstName, lastName, phone) VALUES (?,?,?)",
      [firstName, lastName, phone]
    )
      .then(([data, fields]) => {
        resolve(data);
        console.log(data, fields);
      })
      .catch((err) => {
        reject(err);
      });
  });

  return new Promise((resolve, reject) => {
    const newproduct = {
      id: Math.floor(Math.random() * 1000000),
      ...product,
    };

    // Data.push(newproduct);

    // writeDataToFile("../data.js", Data);

    resolve(newproduct);
  });
};

const updateNewProduct = (id, product) => {
  return new Promise((resolve, reject) => {
    // const index = Data.findIndex((i) => i.id === id);
    // Data[index] = { id, ...product };
    // writeDataToFile("../data.js", Data);
    // resolve(Data[index]);
  });
};

module.exports = {
  findAllProducts,
  findProductById,
  createNewProduct,
  updateNewProduct,
};
