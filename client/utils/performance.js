function performance(elem) {
  const element = document.getElementById(String(elem));

  return {
    hideImageUntilLoaded: document.querySelectorAll("img").forEach((pic) => {
      pic.loading = "lazy";
      pic.addEventListener("load", () => pic.classList.add("fadeIn"));
    }),

    debounce: (func, fuse = 1000) => {
      let delay;

      return function (...args) {
        if (delay) clearTimeout(delay);
        delay = setTimeout(() => {
          func(...args);
        }, fuse);
      };
    },

    mutation: () => {
      const mutated = new MutationObserver((mutations) => {
        mutations.forEach((item) => {
          console.log(item);
        });
      });

      mutated.observe(element, {
        subtree: true,
        childList: true,
        characterData: true,
        attributeOldValue: true,
      });
    },

    fetchAPI: async (url, options = { method: "GET" }) => {
      let fetchOptions = {
        ...options,
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
      };

      const response = await fetch(String(url), fetchOptions).catch((err) =>
        console.log(err)
      );

      return response;
    },
  };
}
