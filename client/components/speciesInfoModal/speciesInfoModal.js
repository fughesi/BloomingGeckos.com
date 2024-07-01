fetch("lib/species.json", { method: "GET" })
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
