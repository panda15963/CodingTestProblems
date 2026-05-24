const readline = require('readline');

// 입력을 위한 인터페이스 생성
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', function (line) {
    // 입력받은 문자열을 공백으로 구분하여 배열로 변환
    const input = line.split(' ');
    const a = Number(input[0]);
    const b = Number(input[1]);
    
    // a와 b 값 출력
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
}).on('close', function () {
    process.exit();
});
