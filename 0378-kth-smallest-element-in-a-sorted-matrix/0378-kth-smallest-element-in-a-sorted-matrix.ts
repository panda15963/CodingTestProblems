/**
 * Finds the kth smallest element using the binary search template.
 * Feasible condition: count of elements <= mid is >= k.
 * We find the first value where this is true.
 */
function kthSmallest(matrix: number[][], k: number): number {
    const n = matrix.length;

    function countLessEqual(target: number): number {
        let count = 0;
        let row = n - 1;
        let col = 0;

        while (row >= 0 && col < n) {
            if (matrix[row][col] <= target) {
                count += row + 1;
                col++;
            } else {
                row--;
            }
        }

        return count;
    }

    function feasible(mid: number): boolean {
        return countLessEqual(mid) >= k;
    }

    let left = matrix[0][0];
    let right = matrix[n - 1][n - 1];
    let firstTrueIndex = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (feasible(mid)) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return firstTrueIndex;
}
