
/* global window */
const storage = {
  get(item, session = true) {
    if (session) {
      return window.sessionStorage.getItem(item);
    }
    return window.localStorage.getItem(item);
  },
  getExactType(item, session = true) {
    if (session) {
      const val1 = window.sessionStorage.getItem(item);
      try {
        return JSON.parse(val1);
      } catch (error) {
        return val1;
      }
    }
    const val2 = window.localStorage.getItem(item);
    try {
      return JSON.parse(val2);
    } catch (error) {
      return val2;
    }
  },
  set(item, value, session = true) {
    if (session) {
      return window.sessionStorage.setItem(item, value);
    }
    return window.localStorage.setItem(item, value);
  },
  clear() {
    sessionStorage.clear();
    localStorage.clear();
  },
  removeItem(item) {
    return removeStorage(item);
  },
};

export default storage;
