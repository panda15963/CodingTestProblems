class Solution {
  public void setZeroes(int[][] matrix) {
    int row = matrix.length;
    int col = matrix[0].length;

    boolean firstRowZero = false;
    boolean firstColZero = false;

    // 첫 열 확인
    for (int i = 0; i < row; i++) {
      if (matrix[i][0] == 0) {
        firstColZero = true;
        break;
      }
    }

    // 첫 행 확인
    for (int j = 0; j < col; j++) {
      if (matrix[0][j] == 0) {
        firstRowZero = true;
        break;
      }
    }

    // 마킹
    for (int i = 1; i < row; i++) {
      for (int j = 1; j < col; j++) {
        if (matrix[i][j] == 0) {
          matrix[i][0] = 0;
          matrix[0][j] = 0;
        }
      }
    }

    // 내부 0 처리
    for (int i = 1; i < row; i++) {
      for (int j = 1; j < col; j++) {
        if (matrix[i][0] == 0 || matrix[0][j] == 0) {
          matrix[i][j] = 0;
        }
      }
    }

    // 첫 열
    if (firstColZero) {
      for (int i = 0; i < row; i++) {
        matrix[i][0] = 0;
      }
    }

    // 첫 행
    if (firstRowZero) {
      for (int j = 0; j < col; j++) {
        matrix[0][j] = 0;
      }
    }
  }
}