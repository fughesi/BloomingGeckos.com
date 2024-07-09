function main(elem) {
  const globals = document.body.classList;
  const element = document.querySelector(String(elem));

  return {
    signature: () => {
      console.log(
        "%cBlooming Geckos",
        "color: #00a5cf; font-size:1.5rem; font-variant: small-caps"
      );
    },

    dialogBox: () => {
      element.addEventListener("toggle", (e) => {
        if (e.newState === "open") {
          document.body.classList.add("modal-open");
        } else {
          document.body.classList.remove("modal-open");
        }
      });
    },

    darkmode: () => {
      const DM = document.documentElement.style; //root of document
      sessionStorage.getItem("color-scheme") ??
        sessionStorage.setItem("color-scheme", false);

      let colorScheme = sessionStorage.getItem("color-scheme");

      if (colorScheme == "true") {
        DM.setProperty("color-scheme", "dark");
        DM.setProperty("--color1", "#000000");
        DM.setProperty("--color2", "#3E432E");
        DM.setProperty("--color3", "#616F39");
        DM.setProperty("--color4", "#A7D129");
        DM.setProperty("--color5", "#B1BB94");
        DM.setProperty("--accent1", "#CD181855");
        DM.setProperty("--grey1", "#333333");
        DM.setProperty("--grey2", "#666666");
        DM.setProperty("--grey3", "#999999");
        DM.setProperty("--grey4", "#cccccc");
        DM.setProperty("--white", "#252422");
        DM.setProperty("--black", "#eeeeee");
      } else {
        DM.setProperty("color-scheme", "light");
        DM.removeProperty("--color1");
        DM.removeProperty("--color2");
        DM.removeProperty("--color3");
        DM.removeProperty("--color4");
        DM.removeProperty("--color5");
        DM.removeProperty("--accent1");
        DM.removeProperty("--grey1");
        DM.removeProperty("--grey2");
        DM.removeProperty("--grey3");
        DM.removeProperty("--grey4");
        DM.removeProperty("--black");
        DM.removeProperty("--white");
      }
    },

    toggleGlobals: () => {
      element?.addEventListener("click", () => {
        globals.toggle("dark"); //defined above
        sessionStorage.setItem("color-scheme", globals.contains("dark"));
        let elem = element.classList;
        elem.toggle("toggle-switch"); //add class for styling
        element.innerText = `${elem.contains("toggle-switch") ? "🌞" : "✨"}`; //change name of button
        main().darkmode(); //call func to change variables
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
main("#tog").toggleGlobals();
main("#popover").dialogBox();

if (sessionStorage.getItem("color-scheme") === "true") tog.innerText = "🌞";

/****** FETCH CALLS ******/
fetch("lib/links.json") // footer links
  .then((res) => res.json())
  .then((links) => {
    let footerContent = "";
    links
      .map((i) => {
        footerContent += `
        <div>
          <p>${i.title}</p>
          <ul>
          ${i.links
            .map((x) => `<li><a href="#" noreferrer>${x}</a></li>`)
            .join("")}
          </ul>
        </div>
      `;
        return footerContent;
      })
      .join("");
    footer.innerHTML = footerContent;
  });

fetch("./lib/species.json") // modal content -- experimental
  .then((res) => res.json())
  .then((modal) => {
    let dialogBoxText = "";
    modal
      .map((item) => {
        const formattedPrice = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(item.price);
        dialogBoxText = `
        <h1>Information for ${
          item.species
        } <span class="small-modal-text">(common names include: ${item.common_names.join(
          ", "
        )})</span></h1>
          <p>Length between ${item.length.at(0) ?? ""}" and ${
          item.length.at(1) ?? ""
        }" // will typically live between ${item.lifespan.at(0) ?? ""} and ${
          item.lifespan.at(1) ?? ""
        } years</p>
          <p>this species prefers to eat ${item.diet.join(
            ", "
          )}, and prefers a ${item.environment} environment in a ${
          item.housing
        } (between ${item.housing_size.at(0)} and ${item.housing_size.at(
          1
        )} gallons)</p>
          <p>${formattedPrice}</p>
          <p>suggested items to purchase for your new gecko: ${item.supplies.join(
            ", "
          )}</p>
      `;
      })
      .join(" ");

    popover.innerHTML = dialogBoxText;
  });
