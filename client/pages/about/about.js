import { fetchRequest } from "../../utils/ajax.js";

console.log("sup from the about js page");

document.getElementById("fizzy").onclick = fetchRequest(
  "aboutDiv",
  "http://localhost:5555/api/products"
);
