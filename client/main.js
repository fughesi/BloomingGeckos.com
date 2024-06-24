function main(elem) {
  const globals = document.body.classList;
  const element = document.getElementById(String(elem));

  return {
    signature: () => {
      console.log(
        "%cBlooming Geckos",
        "color: #00a5cf; font-size:1.5rem; font-variant: small-caps"
      );
    },

    darkmode: () => {
      const DM = document.documentElement.style;
      let colorScheme = sessionStorage.getItem("color-scheme");

      if (colorScheme == "true") {
        DM.setProperty("color-scheme", "dark");
        DM.setProperty("--color1", "#27374d");
        DM.setProperty("--color2", "#d8e9a8");
        DM.setProperty("--color3", "#4e9f3d");
        DM.setProperty("--color4", "#1e5128");
        DM.setProperty("--color5", "#191a19");
        DM.setProperty("--accent1", "#397bdb");
        DM.setProperty("--grey1", "#333333");
        DM.setProperty("--grey2", "#666666");
        DM.setProperty("--grey3", "#999999");
        DM.setProperty("--grey4", "#cccccc");
        DM.setProperty("--white", "#252422");
        DM.setProperty("--black", "#eeeeee");
      } else {
        DM.setProperty("color-scheme", "light");
        DM.setProperty("--color1", "#e1eded");
        DM.setProperty("--color2", "#cfeded");
        DM.setProperty("--color3", "#071952");
        DM.setProperty("--color4", "#2a9c9d");
        DM.setProperty("--color5", "#2d03ff");
        DM.setProperty("--accent1", "cornflowerblue");
        DM.setProperty("--grey1", "#cccccc");
        DM.setProperty("--grey2", "#333333");
        DM.setProperty("--grey3", "#666666");
        DM.setProperty("--grey4", "#999999");
        DM.setProperty("--black", "#252422");
        DM.setProperty("--white", "#eeeeee");
      }
    },

    toggleGlobals: () => {
      element?.addEventListener("click", () => {
        globals.toggle("dark");
        sessionStorage.setItem("color-scheme", globals.contains("dark"));
        main().darkmode();
      });
    },

    debounce: (func, fuse = 1000) => {
      let delay;

      return function (...args) {
        if (delay) clearTimeout(delay);
        delay = setTimeout(() => {
          func(...args);
        }, fuse);
      };
    },
  };
}

main().signature();
main().darkmode();
main("tog").toggleGlobals();
