export const effects = {
  parallax: (elem, speed) => {
    const element = document.querySelectorAll(elem);
    const height = document.documentElement.clientHeight;

    element.length > 0
      ? element.forEach((item) => {
          window.addEventListener("scroll", () => {
            const bounds = item.getBoundingClientRect();

            if (bounds.top < height && bounds.bottom > 0) {
              item.style.transform = `translateY(${window.scrollY * speed}px)`;
            } else {
              window.removeEventListener("scroll", () => {
                element.forEach((item) =>
                  item.style.removeProperty("transform")
                );
              });
            }
          });
        })
      : console.log("need to provide element ID(#)/class(.) as first param");
  },

  scale: (elem, speed) => {
    const element = document.querySelectorAll(elem);
    const height = document.documentElement.clientHeight;

    element.length > 0
      ? element.forEach((item) => {
          window.addEventListener("scroll", () => {
            const bounds = item.getBoundingClientRect();

            if (bounds.top < height && bounds.bottom > 0) {
              item.style.scale = window.scrollY * speed;
            } else {
              window.removeEventListener("scroll", () => {
                element.forEach((item) => item.style.removeProperty("scale"));
              });
            }
          });
        })
      : console.log("need to provide element ID(#)/class(.) as first param");
  },

  visibility: (elem, speed) => {
    const element = document.querySelectorAll(elem);
    const height = document.documentElement.clientHeight;

    element.length > 0
      ? element.forEach((item) => {
          window.addEventListener("scroll", () => {
            const bounds = item.getBoundingClientRect();

            if (bounds.top < height && bounds.bottom > 0) {
              item.style.opacity = window.scrollY * speed;
            } else {
              window.removeEventListener("scroll", () => {
                element.forEach((item) => item.style.removeProperty("opacity"));
              });
            }
          });
        })
      : console.log("need to provide element ID(#)/class(.) as first param");
  },

  observer: (elem, style, margin = "0px 0px 0px 0px", stops = 0.0) => {
    let options = {
      root: null,
      rootMargin: margin.toString(),
      threshold: stops,
    };

    const element = document.querySelectorAll(elem);

    const observer = new IntersectionObserver((entries) => {
      entries?.forEach((entry) => {
        entry?.isIntersecting
          ? entry?.target.classList.add(String(style))
          : entry?.target.classList.remove(String(style));
      });
    }, options);

    element?.length > 0
      ? element.forEach((elem) => observer.observe(elem))
      : console.log("need to provide element ID(#)/class(.) as first param");
  },
};
