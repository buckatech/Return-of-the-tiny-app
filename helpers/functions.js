module.exports = funcObj = {
  returnKeyVal(db, key) {
    let out = ``;
    Object.keys(db).forEach((element) => {
      if (element === key) {
        out = db[key];
      }
    });
    return out;
  },
  rng() {
    return Math.random().toString(36).slice(7);
  },
};
