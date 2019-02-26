class None {
  constructor(error) {
    this.error = error
  }

  expect () {
    if (this.error) {
      throw new Error(this.error)
    }
  }
}

function NoneConstructor (msg) {
  return new None(msg)
}

NoneConstructor.constructor = None.constructor

export default NoneConstructor