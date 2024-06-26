function effects(elem, speed) {
  const element = document.querySelectorAll(elem);
  const height = document.documentElement.clientHeight;

  if (element.length === 0) {
    console.log("need to provide element ID/class as first param");
  }

  return {
    parallax: () => {
      element?.forEach((item) => {
        window.addEventListener("scroll", () => {
          const bounds = item.getBoundingClientRect();
          // adds effect when element in view
          if (bounds.top < height && bounds.bottom > 0) {
            item.style.transform = `translateY(${window.scrollY * speed}px)`; //negative number
          } else {
            //removes effect when out of view
            window.removeEventListener("scroll", () => {
              element.forEach((item) => item.style.removeProperty("transform"));
            });
          }
        });
      });
    },

    scale: () => {
      element.forEach((item) => {
        window.addEventListener("scroll", () => {
          const bounds = item.getBoundingClientRect();
          // adds effect when element in view
          if (bounds.top < height && bounds.bottom > 0) {
            item.style.scale = window.scrollY * speed;
          } else {
            //removes effect when out of view
            window.removeEventListener("scroll", () => {
              element.forEach((item) => item.style.removeProperty("scale"));
            });
          }
        });
      });
    },

    visibility: () => {
      element.forEach((item) => {
        window.addEventListener("scroll", () => {
          const bounds = item.getBoundingClientRect();
          // adds effect when element in view
          if (bounds.top < height && bounds.bottom > 0) {
            item.style.opacity = window.scrollY * speed;
          } else {
            //removes effect when out of view
            window.removeEventListener("scroll", () => {
              element.forEach((item) => item.style.removeProperty("opacity"));
            });
          }
        });
      });
    },

    observer: (style, margin = "0px 0px 0px 0px", stops = 0.0) => {
      let options = {
        root: null, //never used
        rootMargin: String(margin),
        threshold: stops, // array or float
      };
      const observer = new IntersectionObserver((entries) => {
        entries?.forEach((entry) => {
          entry.isIntersecting
            ? entry.target.classList.add(String(style))
            : entry.target.classList.remove(String(style));
        });
      }, options);

      element.forEach((elem) => observer.observe(elem));
    },

    popoverEffects: () => {
      element[0].addEventListener("toggle", (event) => {
        if (event.newState === "open") {
          document.body.classList.add("stop-scrolling");
        } else {
          document.body.classList.remove("stop-scrolling");
        }
      });
    },
  };
}
