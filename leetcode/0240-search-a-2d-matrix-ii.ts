function searchMatrix(
    matrix: number[][],
    target: number
): boolean {
    for (const row of matrix) {
        let left = 0;
        let right = row.length - 1;

        // 각 행에서 이진 탐색
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (row[mid] === target) {
                return true;
            } else if (row[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return false;
}