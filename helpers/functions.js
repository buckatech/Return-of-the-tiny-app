module.exports = funcObj = {
  rng() {
    return Math.random().toString(36).slice(7);
  },
  isEmpty(email, pass) {
    if (email.replace(/\s/g, '').length && pass.replace(/\s/g, '').length) {
      return 'green';
    } else {
      return 'red';
    }
  },
  checkExist(users, inputEmail) {
    let bool;
    Object.values(users).forEach(element => {
      if (element.email === inputEmail) {
        bool = true
      }
    });
    return bool
  },
};
