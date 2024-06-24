document.querySelectorAll("img").forEach((pic) => {
  pic.addEventListener("load", () => pic.classList.add("fadeIn"));
});
