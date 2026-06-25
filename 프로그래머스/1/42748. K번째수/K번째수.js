function solution(array, commands) {
    var answer = [];
    for (let i = 0; i < commands.length; i++) {
        let command = commands[i];
        let start = command[0] - 1;
        let end = command[1];
        let k = command[2] - 1;
        
        // 배열 자르고 오름차순 정렬
        let sliced = array.slice(start, end).sort((a, b) => a - b);
        answer.push(sliced[k]);
    }
    return answer;
}
