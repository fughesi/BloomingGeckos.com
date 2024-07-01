function performance(elem) {
  const element = document.getElementById(String(elem));

  return {
    debounce: (func, fuse = 500) => {
      let delay;

      return function (...args) {
        if (delay) clearTimeout(delay);
        delay = setTimeout(() => {
          func(...args);
        }, fuse);
      };
    },

    regexFormValidation: () => {
      const patterns = {
        firstName: /^[a-z\d]{5,12}$/i,
        username: /^[a-z\d]{5,12}$/i,
        password: /^[\w@-]{8,20}$/,
        telephone: /^\d{11}$/,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
      };

      function validate(field, regex) {
        if (regex?.test(field.value)) {
          field.classList.add("valid-input");
        } else {
          field.classList.remove("valid-input");
        }
      }

      element?.querySelectorAll("input").forEach((item) => {
        item.addEventListener("input", (e) => {
          const name = e.target.attributes.name.value;
          validate(e.target, patterns[name]);
        });
      });
    },

    mutation: () => {
      const mutated = new MutationObserver((mutations) => {
        mutations.forEach((item) => {
          // console.log(item);
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

    fadeImages: () => {
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
    },
  };
}
