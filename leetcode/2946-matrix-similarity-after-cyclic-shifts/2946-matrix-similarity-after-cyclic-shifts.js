function areSimilar(mat, k) {
  const m = mat.length;
  const n = mat[0].length;
  const shift = k % n; // effective shift

  if (shift === 0) return true; // whole matrix returns to original

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (r % 2 === 0) {
        // even row: left shift
        const nc = (c + shift) % n;
        if (mat[r][c] !== mat[r][nc]) return false;
      } else {
        // odd row: right shift
        const nc = (c - shift + n) % n;
        if (mat[r][c] !== mat[r][nc]) return false;
      }
    }
  }
  return true;
}