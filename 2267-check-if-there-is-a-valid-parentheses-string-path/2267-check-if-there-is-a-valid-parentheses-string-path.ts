/**
 * Determines if there exists a valid path from top-left to bottom-right
 * in a grid containing only '(' and ')' characters, where the path forms
 * a valid parentheses string.
 * 
 * @param grid - 2D array of strings containing only '(' or ')'
 * @returns true if a valid parentheses path exists, false otherwise
 */
function hasValidPath(grid: string[][]): boolean {
    const rows: number = grid.length;
    const cols: number = grid[0].length;

    // Early termination checks:
    // 1. Path length must be even for balanced parentheses
    // 2. Must start with '(' and end with ')'
    if ((rows + cols - 1) % 2 !== 0 || 
        grid[0][0] === ')' || 
        grid[rows - 1][cols - 1] === '(') {
        return false;
    }

    // 3D visited array: [row][col][balance]
    // Tracks if we've visited position (row, col) with a specific balance count
    const visited: boolean[][][] = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => 
            Array(rows + cols).fill(false)
        )
    );

    // Direction vectors for moving right and down
    const directions: number[] = [1, 0, 1];

    /**
     * Depth-first search to find a valid parentheses path
     * 
     * @param row - Current row position
     * @param col - Current column position
     * @param balance - Current balance of parentheses (count of unmatched '(')
     * @returns true if a valid path exists from current position
     */
    const dfs = (row: number, col: number, balance: number): boolean => {
        // Check if this state has been visited
        if (visited[row][col][balance]) {
            return false;
        }

        // Mark current state as visited
        visited[row][col][balance] = true;

        // Update balance based on current cell
        // '(' increases balance, ')' decreases it
        balance += grid[row][col] === '(' ? 1 : -1;

        // Pruning conditions:
        // 1. Balance cannot be negative (more ')' than '(')
        // 2. Balance cannot exceed remaining cells (impossible to balance)
        const remainingCells: number = (rows - row - 1) + (cols - col - 1);
        if (balance < 0 || balance > remainingCells) {
            return false;
        }

        // Check if we reached the destination
        if (row === rows - 1 && col === cols - 1) {
            return balance === 0; // Valid only if perfectly balanced
        }

        // Try moving in both possible directions (right and down)
        for (let dirIndex = 0; dirIndex < 2; dirIndex++) {
            const nextRow: number = row + directions[dirIndex];
            const nextCol: number = col + directions[dirIndex + 1];
          
            // Check bounds and recursively explore
            if (nextRow >= 0 && nextRow < rows && 
                nextCol >= 0 && nextCol < cols && 
                dfs(nextRow, nextCol, balance)) {
                return true;
            }
        }

        return false;
    };

    // Start DFS from top-left corner with initial balance of 0
    return dfs(0, 0, 0);
}
