const fs = require('fs');
const str = fs.readFileSync(0, 'utf8').trim();

for (const ch of str) {
  console.log(ch);
}
