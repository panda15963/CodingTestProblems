/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
    const answer = Array.from({ length: n }, () => Array(n).fill(0));
    let number = 0;

    let top = 0, bottom = n - 1;
    let left = 0, right = n - 1;

    while (top <= bottom && left <= right) {

        // 오른쪽으로 이동
        for (let col = left; col <= right; col++) {
            answer[top][col] = ++number;
        }
        top++;

        // 아래로 이동
        for (let row = top; row <= bottom; row++) {
            answer[row][right] = ++number;
        }
        right--;

        // 왼쪽으로 이동
        if (left <= right) {
            for (let col = right; col >= left; col--) {
                answer[bottom][col] = ++number;
            }
            bottom--;
        }

        // 위로 이동
        if (top <= bottom) {
            for (let row = bottom; row >= top; row--) {
                answer[row][left] = ++number;
            }
            left++;
        }
    }

    return answer;
};