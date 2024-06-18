const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const routes = {
  "/": {
    path: "pages/home/home.html",
    js: "./pages/home/home.js",
    title: "HOME",
  },
  "/about": {
    path: "pages/about/about.html",
    js: "./pages/about/about.js",
    title: "ABOUT",
  },
  "/contact": {
    path: "pages/contact/contact.html",
    js: "./pages/contact/contact.js",
    title: "CONTACT",
  },
  "/care": {
    path: "pages/care/care.html",
    js: "./pages/care/care.js",
    title: "CARE",
  },
  "/terms": {
    path: "pages/terms/terms.html",
    js: "./pages/terms/terms.js",
    title: "TERMS",
  },
  "/availability": {
    path: "pages/availability/availability.html",
    js: "./pages/availability/availability.js",
    title: "AVAILABILITY",
  },
  "/listing": {
    path: "pages/listing/listing.html",
    js: "./pages/listing/listing.js",
    title: "LISTING",
  },
  404: { path: "pages/404/404.html", title: "404" },
};

const handleLocation = async () => {
  const path = window.location.pathname;
  const html = routes[path].path || routes[404].path;
  const js = routes[path].js || routes["/"].js;

  fetch(html)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("main-page").innerHTML = html;
      document.title = `Blooming Geckos | ${routes[path].title}`;

      const source = document.getElementById("source");
      const script = document.createElement("script");
      script.src = js;
      script.id = "source";
      document.body.replaceChild(script, source);
    });
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
