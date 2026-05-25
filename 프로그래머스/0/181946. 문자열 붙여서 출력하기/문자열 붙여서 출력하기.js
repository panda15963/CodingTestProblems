const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}).on('line', function (line) {
    const strArr = line.split(' ')
    console.log(strArr.join(''))
})
