/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
    const ret = [];
    const queens = [];

    recall(n, queens, 0);

    return ret;

    function recall(n, queens, row) {
        // 모든 행에 퀸을 배치한 경우
        if (row >= n && queens.length === n) {
            ret.push(getStrings(n, queens));
            return;
        }

        // 현재 행의 모든 열 탐색
        for (let col = 0; col < n; col++) {
            if (isPosable(queens, row, col)) {
                queens.push([row, col]);
                recall(n, queens, row + 1);
                queens.pop(); // 백트래킹
            }
        }
    }

    function getStrings(n, queens) {
        const result = [];

        for (let row = 0; row < queens.length; row++) {
            const queen = queens[row];
            let str = "";

            for (let col = 0; col < n; col++) {
                if (queen[0] === row && queen[1] === col) {
                    str += "Q";
                } else {
                    str += ".";
                }
            }

            result.push(str);
        }

        return result;
    }

    function isPosable(queens, row, col) {
        for (const queen of queens) {
            if (
                queen[1] === col ||
                queen[0] + queen[1] === row + col ||
                queen[0] - queen[1] === row - col
            ) {
                return false;
            }
        }

        return true;
    }
};