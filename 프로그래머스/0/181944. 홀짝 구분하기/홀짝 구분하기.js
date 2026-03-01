const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim();
const n = parseInt(input);

console.log(`${n} is ${n % 2 === 0 ? 'even' : 'odd'}`);
