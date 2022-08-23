class APIResponse {
  error;
  result;
  sc;
  time;
  constructor(sc, result) {
    this.sc = sc;
    if (sc) {
      this.result = result || {};
    } else {
      this.error = result || {};
    }
    this.time = new Date().getTime();
  }
}

module.exports = APIResponse;
