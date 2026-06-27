function solution(grid, d, k) {
  const MOD = 1000000007;
  const n = grid.length;
  const m = grid[0].length;
  let oneL = dirRoad(grid, d, n, m);
  let board = null;
  let cnt = 1;

  while (cnt <= k) {
    if ((cnt & k) === cnt) {
      board = roadLink(board, oneL, n, m);
    }
    oneL = roadLink(oneL, oneL, n, m);
    cnt <<= 1;
  }

  let result = 0;
  for (let a = 0; a < n; a++) {
    for (let b = 0; b < m; b++) {
      for (let c = 0; c < n; c++) {
        for (let q = 0; q < m; q++) {
          result = (result + board[a][b][c][q]) % MOD;
        }
      }
    }
  }
  return result;
}


function dirRoad(grid, d, n, m) {
  let board = null; 
  const MOD = 1000000007;
  for (let s of d) {
    let RBoard = board;
    board = Array.from({ length: n }, () =>
      Array.from({ length: m }, () => Array.from({ length: n }, () => Array(m).fill(0)))
    );

    for (let a = 0; a < n; a++) {
      for (let b = 0; b < m; b++) {
        if (a > 0 && grid[a - 1][b] - grid[a][b] === s) {
          if (RBoard === null) {
            board[a - 1][b][a][b] = 1;
          } else {
            for (let c = 0; c < n; c++) {
              for (let q = 0; q < m; q++) {
                board[a - 1][b][c][q] = (board[a - 1][b][c][q] + RBoard[a][b][c][q]) % MOD;
              }
            }
          }
        }
        if (b > 0 && grid[a][b - 1] - grid[a][b] === s) {
          if (RBoard === null) {
            board[a][b - 1][a][b] = 1;
          } else {
            for (let w = 0; w < n; w++) {
              for (let e = 0; e < m; e++) {
                board[a][b - 1][w][e] = (board[a][b - 1][w][e] + RBoard[a][b][w][e]) % MOD;
              }
            }
          }
        }
        if (a < n - 1 && grid[a + 1][b] - grid[a][b] === s) {
          if (RBoard === null) {
            board[a + 1][b][a][b] = 1;
          } else {
            for (let w = 0; w < n; w++) {
              for (let e = 0; e < m; e++) {
                board[a + 1][b][w][e] = (board[a + 1][b][w][e] + RBoard[a][b][w][e]) % MOD;
              }
            }
          }
        }
        if (b < m - 1 && grid[a][b + 1] - grid[a][b] === s) {
          if (RBoard === null) {
            board[a][b + 1][a][b] = 1;
          } else {
            for (let w = 0; w < n; w++) {
              for (let e = 0; e < m; e++) {
                board[a][b + 1][w][e] = (board[a][b + 1][w][e] + RBoard[a][b][w][e]) % MOD;
              }
            }
          }
        }
      }
    }
  }
  return board;
}

function roadLink(r1, r2, n, m) {
  const MOD = 1000000007;
  if (r1 === null) {
    return r2;
  }
  if (r2 === null) {
    return r1;
  }

  const board = Array.from({ length: n }, () => Array.from({ length: m }, () => Array.from({ length: n }, () => Array(m).fill(0))));

  for (let a = 0; a < n; a++) {
    for (let b = 0; b < m; b++) {
      for (let c = 0; c < n; c++) {
        for (let q = 0; q < m; q++) {
          for (let w = 0; w < n; w++) {
            for (let e = 0; e < m; e++) {
              const p = BigInt(r1[a][b][c][q]) * BigInt(r2[c][q][w][e]) % BigInt(MOD);
              board[a][b][w][e] = (board[a][b][w][e] + Number(p)) % MOD;
            }
          }
        }
      }
    }
  }
  return board;
}