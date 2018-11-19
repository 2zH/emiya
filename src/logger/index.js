class Logger {
  printError(msg) {
    return this._log(`error: ${msg}`)
  }

  _log(msg) {
    console.log(msg)
  }

  log(msg) {
    this._log(msg)
  }
}

module.exports = new Logger()
