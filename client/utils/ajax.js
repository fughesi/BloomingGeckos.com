const talkToDatabase = async (target, method, url, body) => {
  const addDataToElement = document.getElementById(String(target));

  let options = {
    method: String(method).toUpperCase(),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  if (String(method).toUpperCase() !== "GET") {
    options = {
      ...options,
      body: JSON.stringify(body),
    };
  }

  const fetchedData = await fetch(String(url), options)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.error(error.message))
    .finally(console.log("data fetched from API"));

  try {
    // addDataToElement.append(
    //   `this is the title ${fetchedData.contactLastName} and this is the id: ${fetchedData.city}`
    // );
    addDataToElement.innerHTML = `this is the title ${fetchedData.contactLastName} and this is the id: ${fetchedData.city}`;
  } catch (error) {
    console.error(error.message);
  }
};
