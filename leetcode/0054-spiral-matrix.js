/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
    if (!matrix || matrix.length === 0) {
        return [];
    }

    const result = [];
    let left = 0;
    let right = matrix[0].length;
    let top = 0;
    let bottom = matrix.length;

    while (left < right && top < bottom) {
        // Top row
        for (let i = left; i < right; i++) {
            result.push(matrix[top][i]);
        }
        top++;

        // Right column
        for (let i = top; i < bottom; i++) {
            result.push(matrix[i][right - 1]);
        }
        right--;

        if (!(left < right && top < bottom)) {
            break;
        }

        // Bottom row
        for (let i = right - 1; i >= left; i--) {
            result.push(matrix[bottom - 1][i]);
        }
        bottom--;

        // Left column
        for (let i = bottom - 1; i >= top; i--) {
            result.push(matrix[i][left]);
        }
        left++;
    }

    return result;
}