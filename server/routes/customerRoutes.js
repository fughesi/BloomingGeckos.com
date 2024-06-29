const { customerControllers } = require("../controllers/customerControllers");

async function customerRoutes(req, res) {
  const id = req.url.split("/")[3];

  switch (String(req.method).toUpperCase()) {
    case "GET":
      if (id) {
        await customerControllers(req, res).getUserById(id);
      } else {
        await customerControllers(req, res).getAllUsers();
      }
      break;

    case "POST":
      await customerControllers(req, res).createCustomer();
      break;

    case "PATCH":
      if (id) {
        await customerControllers(req, res).updateUser(id);
      }
      break;

    case "DELETE":
      if (id) {
        res.end(JSON.stringify({ id, method: "delete" }));
      } else {
        await customerControllers(req, res).getAllUsers();
      }
      break;

    default:
      console.table({ 404: "route not found" });
  }
}

module.exports = { customerRoutes };
