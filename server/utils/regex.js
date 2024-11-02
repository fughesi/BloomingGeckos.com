function regex() {
  return {
    regexValidation: () => {
      // work in progress
      const patterns = {
        firstName: /^[a-z\d]{5,12}$/i,
        username: /^[a-z\d]{5,12}$/i,
        password: /^[\w@-]{8,20}$/,
        telephone: /^\d{11}$/,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
      };
    },
  };
}

module.exports = { regex };
