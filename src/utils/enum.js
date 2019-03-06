const keys = Symbol("keys");
const values = Symbol("values");

class Enum {
  constructor(dict) {
    this[keys] = [];
    this[values] = [];
    dict
      .map((el, index) => {
        const [key, value] = Array.isArray(el) ? el : [el, index];
        if (Array.isArray(el)) {
          const [, initialValue = 0] = dict[0];
          if (typeof initialValue === "number") {
            const [key, value = initialValue + index] = el;
            return [key, value];
          }
          return el;
        }
        return [el, index];
      })
      .forEach(([key, value]) => {
        this[key] = value;
        this[value] = key;
        this[keys].push(key);
        this[values].push(value);
      });
  }

  keys() {
    return this[keys];
  }

  values() {
    return this[values];
  }
}

module.exports = Enum;
