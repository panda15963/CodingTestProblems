const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (line) {
    const [a, b] = line.split(' ').map(Number);
    console.log(`${a} + ${b} = ${a + b}`);  // 템플릿 리터럴 사용 [web:84][web:90]
    rl.close();
});
