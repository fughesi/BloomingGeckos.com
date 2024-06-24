export const fetchRequest = async (target, url, options) => {
  const element = document.getElementById(String(target));

  let fetchOptions = {
    ...options,
    method: options?.method ? String(options.method).toUpperCase() : "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  const fetchedData = await fetch(String(url), fetchOptions)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error.message))
    .finally(console.log("data fetched from API"));

  try {
    element.innerHTML = `this is the title ${fetchedData[0]?.ingredients} and this is the id: ${fetchedData[0]?.email}`;
  } catch (error) {
    throw new Error("Fetch request failed");
  }
};
