module.exports = class Exception {
  err;
  error;
  errorCode;
  msg;

  constructor(errorCode, msg, err) {
    this.errorCode = errorCode;
    this.msg = msg;
    if (err) {
      this.err = err;
    }
  }
}
