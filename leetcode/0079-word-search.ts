/**
 * Determines if a word exists in a 2D board by searching adjacent cells
 * @param board - 2D array of characters representing the board
 * @param word - Target word to search for in the board
 * @returns true if the word exists in the board, false otherwise
 */
function exist(board: string[][], word: string): boolean {
    const rows: number = board.length;
    const cols: number = board[0].length;
  
    // Direction vectors for exploring 4 adjacent cells (up, right, down, left)
    // Used as pairs: (directions[i], directions[i+1]) for row and column offsets
    const directions: number[] = [-1, 0, 1, 0, -1];
  
    /**
     * Depth-first search to find the word starting from position (row, col)
     * @param row - Current row position in the board
     * @param col - Current column position in the board
     * @param wordIndex - Current index in the word being matched
     * @returns true if the remaining word can be found from this position
     */
    const depthFirstSearch = (row: number, col: number, wordIndex: number): boolean => {
        // Base case: reached the last character of the word
        if (wordIndex === word.length - 1) {
            return board[row][col] === word[wordIndex];
        }
      
        // Current cell doesn't match the expected character
        if (board[row][col] !== word[wordIndex]) {
            return false;
        }
      
        // Temporarily mark the current cell as visited by storing its value
        const originalChar: string = board[row][col];
        board[row][col] = '0'; // Mark as visited
      
        // Explore all 4 adjacent directions
        for (let direction = 0; direction < 4; direction++) {
            const nextRow: number = row + directions[direction];
            const nextCol: number = col + directions[direction + 1];
          
            // Check if the next position is within bounds
            const isValidPosition: boolean = 
                nextRow >= 0 && nextRow < rows && 
                nextCol >= 0 && nextCol < cols;
          
            // If valid position, not visited, and continues to match the word
            if (isValidPosition && 
                board[nextRow][nextCol] !== '0' && 
                depthFirstSearch(nextRow, nextCol, wordIndex + 1)) {
                return true;
            }
        }
      
        // Backtrack: restore the original character
        board[row][col] = originalChar;
        return false;
    };
  
    // Try starting the search from every cell in the board
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (depthFirstSearch(row, col, 0)) {
                return true;
            }
        }
    }
  
    return false;
}