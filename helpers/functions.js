const bcrypt = require('bcrypt');
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
  objIsEmpty(obj) {
    if (obj) {
      return 'goodCookie';
    } else {
      return 'redirect';
    }
  },
  checkExist(users, input) {
    let bool;
    Object.values(users).forEach((element) => {
      if (element.email === input) {
        bool = true;
      }
    });
    return bool;
  },
  checkLogin(users, input) {
    let out;
    Object.values(users).forEach((element) => {
      if (bcrypt.compareSync(input.password, element.password) && element.email === input.email) {
        out = element.id;
        console.log(out)
      }
    });
    return out;
  },
  outDB(db, key) {
    let outObj = {};
    Object.keys(db).forEach((element) => {
      if (element === key) {
        outObj = db[element];
      }
    });
    return outObj;
  },
};
