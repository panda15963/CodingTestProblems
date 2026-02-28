const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('close', function () {
    console.log("!@#$%^&*(\\'\"<>?:;");  // 이스케이프 처리 [web:79]
});
