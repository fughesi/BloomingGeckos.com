document.querySelectorAll("img").forEach((pic) => {
  pic.loading = "lazy";
  function loaded() {
    pic.classList.add("fadeIn");
  }
  if (pic.complete) {
    loaded();
  } else {
    pic.addEventListener("load", loaded);
  }
});
