import { debounce } from "./utils/debounce.js";
// debounce(); <---implement this

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routes = {
  "/": "/pages/home/home.html",
  "/about": "pages/about/about.html",
  "/contact": "pages/contact/contact.html",
  404: "pages/404/404.html",
};

const title = {
  "/": "HOME",
  "/about": "ABOUT",
  "/lorem": "LOREM",
  404: "Not Found",
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("main-page").innerHTML = html;
  // document.title = `Blooming Geckos | ${title[path]}`;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
