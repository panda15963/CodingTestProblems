function areSimilar(mat: number[][], k: number): boolean {
  const rowCount: number = mat.length;
  const columnCount: number = mat[0].length;

  const shift: number = k % columnCount; // 유효한 이동

  if (shift === 0) {
    return true;
  }

  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < columnCount; c++) {
      if (r % 2 === 0) {
        // 짝수 행: 왼쪽 shift
        const nc: number = (c + shift) % columnCount;
        if (mat[r][c] !== mat[r][nc]) {
          return false;
        }
      } else {
        // 홀수 행: 오른쪽 shift
        const nc: number = (c - shift + columnCount) % columnCount;
        if (mat[r][c] !== mat[r][nc]) {
          return false;
        }
      }
    }
  }

  return true;
}