class RequestResponseContext {
  #res;
  #req;

  constructor(req, res) {
    this.#res = res;
    this.#req = req;

    this.body = req.body;
    this.query = req.query;
    this.params = req.params;
    this.headers = req.headers;

    Object.entries(req.context || {}).forEach(([key, value]) => {
      console.log({ key, value });
      this.add(key, value);
    })
  }

  setCookie(key, value, maxAge_ms) {
    if (!(key && value)) {
      throw new Error(`Both key and value are required and must be string`)
    } 

    if (typeof key !== 'string' || typeof value !== 'string') {
      throw new Error(`Both key and value should be strings, expected [string, string] got [${typeof key}, ${typeof value}]`)
    }

    const secure = process.env.NODE_ENV === 'development' ? false : true; 
    this.#res.cookie(key,value, { maxAge: maxAge_ms, httpOnly: true, secure });
    return "ok";
  }

  clearCookie(key) {
    const secure = process.env.NODE_ENV === 'development' ? false : true; 
    this.#res.clearCookie(key, { httpOnly: true, secure })
    return "ok";
  }

  add(propertyName, propertyValue) {
    this[propertyName] = propertyValue;
  }
}

module.exports = RequestResponseContext;