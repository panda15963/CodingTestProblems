function containsCycle(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const directions = [-1, 0, 1, 0, -1];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (visited[row][col]) continue;

      const queue = [[row, col, -1, -1]];
      visited[row][col] = true;

      for (let i = 0; i < queue.length; i++) {
        const [x, y, px, py] = queue[i];

        for (let d = 0; d < 4; d++) {
          const nx = x + directions[d];
          const ny = y + directions[d + 1];

          if (nx < 0 || nx >= rows || ny < 0 || ny >= cols) continue;
          if (grid[nx][ny] !== grid[x][y]) continue;
          if (nx === px && ny === py) continue;

          if (visited[nx][ny]) return true;

          visited[nx][ny] = true;
          queue.push([nx, ny, x, y]);
        }
      }
    }
  }

  return false;
}