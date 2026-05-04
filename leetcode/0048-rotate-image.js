/**
 * @param {number[][]} matrix
 * @return {void}
 */
function rotate(matrix) {
  matrix.reverse();

  const n = matrix.length;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < row; col++) {
      [matrix[row][col], matrix[col][row]] = [matrix[col][row], matrix[row][col]];
    }
  }
}