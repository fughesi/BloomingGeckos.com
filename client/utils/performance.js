export const performance = {
  hideImageUntilLoaded: document.querySelectorAll("img").forEach((pic) => {
    pic.addEventListener("load", () => pic.classList.add("fadeIn"));
  }),
  test: (a) => {
    console.log("test these nuts", a);
  },
};
