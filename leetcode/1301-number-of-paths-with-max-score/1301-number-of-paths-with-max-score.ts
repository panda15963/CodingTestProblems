function pathsWithMaxScore(board: string[]): number[] {
    const boardSize = board.length;
    const MOD = 1e9 + 7;
  
    // dp[i][j] stores the maximum score from position (i,j) to end
    const maxScore: number[][] = Array(boardSize).fill(null).map(() => 
        Array(boardSize).fill(-1)
    );
  
    // pathCount[i][j] stores the number of paths achieving maximum score from (i,j) to end
    const pathCount: number[][] = Array(boardSize).fill(null).map(() => 
        Array(boardSize).fill(0)
    );
  
    // Base case: end position has score 0 and 1 path
    maxScore[boardSize - 1][boardSize - 1] = 0;
    pathCount[boardSize - 1][boardSize - 1] = 1;
  
    // Function to update cell (i,j) based on cell (prevX,prevY)
    const updateCell = (i: number, j: number, prevX: number, prevY: number): void => {
        // Check boundaries and validity
        if (prevX >= boardSize || prevY >= boardSize || 
            maxScore[prevX][prevY] === -1 || 
            board[i][j] === 'X' || board[i][j] === 'S') {
            return;
        }
      
        // If path from (prevX,prevY) gives better score
        if (maxScore[prevX][prevY] > maxScore[i][j]) {
            maxScore[i][j] = maxScore[prevX][prevY];
            pathCount[i][j] = pathCount[prevX][prevY];
        } 
        // If path from (prevX,prevY) gives same score, add to path count
        else if (maxScore[prevX][prevY] === maxScore[i][j]) {
            pathCount[i][j] = (pathCount[i][j] + pathCount[prevX][prevY]) % MOD;
        }
    };
  
    // Fill DP table from bottom-right to top-left
    for (let i = boardSize - 1; i >= 0; i--) {
        for (let j = boardSize - 1; j >= 0; j--) {
            // Try all three possible moves: down, right, diagonal
            updateCell(i, j, i + 1, j);      // Move down
            updateCell(i, j, i, j + 1);      // Move right
            updateCell(i, j, i + 1, j + 1);  // Move diagonal
          
            // Add current cell's value to the score if reachable
            if (maxScore[i][j] !== -1) {
                const cellChar = board[i][j];
                if (cellChar >= '0' && cellChar <= '9') {
                    maxScore[i][j] += parseInt(cellChar);
                }
            }
        }
    }
  
    // Prepare result: [maximum score, number of paths]
    const result: number[] = [0, 0];
    if (maxScore[0][0] !== -1) {
        result[0] = maxScore[0][0];
        result[1] = pathCount[0][0];
    }
  
    return result;
}