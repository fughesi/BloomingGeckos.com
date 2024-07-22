function validate(value = "") {
  const tests = [];
  value.trim();

  return {
    email() {
      const regex = /^([a-z\d\.-]+)@([a-z\d-]+).([a-z]{2,})(\.[a-z]{2,})?$/i;
      tests.push(regex.test(value) && typeof value === "string");
      return this;
    },

    name() {
      const regex = /^[a-z-_]{2,25}$/i;
      tests.push(regex.test(value) && typeof value === "string");
      return this;
    },

    phone() {
      const regex = /^[\d-\._\(\)]{7,15}$/i;
      tests.push(regex.test(value));
      return this;
    },

    address() {
      const regex = /^[\w\d]{7,15}$/i;
      //regex
      tests.push(regex.test(value));
      return this;
    },

    city() {
      //regex
      tests.push(regex.test(value));
      return this;
    },

    state() {
      //regex
      tests.push(regex.test(value));
      return this;
    },

    password() {
      const regex = /^[\w]{8,25}$/i;
      tests.push(regex.test(value) && typeof value === "string");
      return this;
    },

    match(match) {
      tests.push(value === match);
      return this;
    },

    min(min = 0) {
      tests.push(Boolean(value.length >= min));
      return this;
    },

    max(max = 0) {
      tests.push(Boolean(value.length <= max));
      return this;
    },

    get valid() {
      return tests.every(Boolean);
    },
  };
}

module.exports = { validate };
