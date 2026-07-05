function solution(board, moves) {
    let answer = 0;
    const stack = [];

    for (const move of moves) {
        for (let j = 0; j < board.length; j++) {
            if (board[j][move - 1] !== 0) {

                if (stack.length === 0) {
                    stack.push(board[j][move - 1]);
                    board[j][move - 1] = 0;
                    break;
                }

                if (board[j][move - 1] === stack[stack.length - 1]) {
                    stack.pop();
                    answer += 2;
                } else {
                    stack.push(board[j][move - 1]);
                }

                board[j][move - 1] = 0;
                break;
            }
        }
    }

    return answer;
}