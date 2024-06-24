testbtn.addEventListener(
  "click",
  performance().debounce(() => console.log(4 * 3))
);

effects("#aboutDiv", -0.4).parallax();
