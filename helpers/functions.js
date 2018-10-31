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
  checkExist(users, input) {
    let bool;
    Object.values(users).forEach(element => {
      if (element.email === input) {
        bool = true
      }
    });
    return bool
  },
  checkLogin(users, input) {
    let out;
    Object.values(users).forEach(element => {
      if (element.password === input.password && element.email === input.email) {
        out = element.id
      }
    });
    return out;
  }
};
