function convert(s, numRows) {
  if (numRows === 1 || numRows >= s.length) return s;

  const rows = new Array(numRows).fill("");
  let currentRow = 0;
  let direction = -1;

  for (const char of s) {
    rows[currentRow] += char;

    if (currentRow === 0 || currentRow === numRows - 1) {
      direction *= -1;
    }

    currentRow += direction;
  }

  return rows.join("");
}