const talkToDatabase = async (target, url, options) => {
  const addDataToElement = document.getElementById(String(target));

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
    addDataToElement.innerHTML = `this is the title ${fetchedData.contactLastName} and this is the id: ${fetchedData.city}`;
  } catch (error) {
    console.error(error.message);
  }
};
