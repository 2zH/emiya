const lib = `function sum(a, b) {
  return a + b
}

module.exports = sum
`
const test = `const sum = require('./lib');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
`
const node = `#!/usr/bin/env node

console.log(\'Hello world!\')
`
const web = 'document.write(\'Hello world!\')'
const html = `<html>
<body>
  <script src="./src/index.js"></script>
</body>
</html>`

module.exports = {
  node,
  lib,
  test,
  web,
  html
}