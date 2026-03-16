function convert(s: string, numRows: number): string {
  if (numRows === 1 || numRows >= s.length) return s;

  const rows: string[] = new Array(numRows).fill("");
  let currentRow: number = 0;
  let direction: number = -1;

  for (const char of s) {
    rows[currentRow] += char;

    if (currentRow === 0 || currentRow === numRows - 1) {
      direction *= -1;
    }

    currentRow += direction;
  }

  return rows.join("");
}