const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (line) {
    let result = '';
    for (let char of line) {
        if (char === char.toUpperCase()) {
            result += char.toLowerCase();  // toggle case [web:56]
        } else {
            result += char.toUpperCase();
        }
    }
    console.log(result);
    rl.close();
});
