const bcrypt = require('bcrypt');
module.exports = {
  /**
   * @returns A random number
   */
  rng() {
    return Math.random().toString(36).substr(2, 6);
  },
  /**
   *
   * @param {email} email
   * @param {password} pass
   * @returns {red} If username or password is empty
   * @returns {green} If username and password exist
   */
  isEmpty(email, pass) {
    if (email.replace(/\s/g, '').length && pass.replace(/\s/g, '').length) {
      return 'green';
    } else {
      return 'red';
    }
  },
  /**
   *
   * @param {Object} obj
   * Checks if object exists
   */
  objIsEmpty(obj) {
    if (obj) {
      return 'goodCookie';
    } else {
      return 'redirect';
    }
  },
  /**
   *
   * @param {users} users
   * @param {input} input
   * Checks if an input exists in the user object
   */
  checkExist(users, input) {
    let bool;
    Object.values(users).forEach((element) => {
      console.log(element.email);
      console.log(element);
      console.log(input);
      if (element.email === input) {
        bool = true;
      }
    });
    return bool;
  },
  /**
   *
   * @param {users} users
   * @param {input} input
   * Checks if an input object exists in the user object
   */
  checkLogin(users, input) {
    let out;
    Object.values(users).forEach((element) => {
      if (bcrypt.compareSync(input.password, element.password) && element.email === input.email) {
        out = element.id;
        console.log(out);
      }
    });
    return out;
  },
  /**
   *
   * @param {db} db
   * @param {key} key
   * Checks if key exists in object
   */
  outDB(db, key) {
    let outObj = {};
    Object.keys(db).forEach((element) => {
      if (element === key) {
        outObj = db[element];
      }
    });
    return outObj;
  },
  /**
   *
   * @param {urls} urls
   * Flattens an object 1 level
   */
  innerUrls(urls) {
    urls =
      Object.assign(
          {},
          ...function _flatten(urls) {
            return [].concat(...Object.keys(urls)
                .map((k) =>
          typeof urls[k] === 'object' ?
            _flatten(urls[k]) :
            ({[k]: urls[k]})
                )
            );
          }(urls));
    return urls;
  },
};
