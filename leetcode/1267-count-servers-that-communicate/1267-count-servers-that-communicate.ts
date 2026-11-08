/**
 * Count the number of servers that can communicate with at least one other server
 * @param grid - 2D grid where 1 represents a server and 0 represents empty space
 * @returns The count of servers that can communicate
 */
function countServers(grid: number[][]): number {
    // Get grid dimensions
    const rowCount: number = grid.length;
    const columnCount: number = grid[0].length;
  
    // Arrays to track the number of servers in each row and column
    const serversPerRow: number[] = new Array(rowCount).fill(0);
    const serversPerColumn: number[] = new Array(columnCount).fill(0);
  
    // First pass: Count servers in each row and column
    for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
            if (grid[row][column] === 1) {
                serversPerRow[row]++;
                serversPerColumn[column]++;
            }
        }
    }
  
    // Second pass: Count servers that can communicate
    let communicatingServers: number = 0;
    for (let row = 0; row < rowCount; row++) {
        for (let column = 0; column < columnCount; column++) {
            // A server can communicate if there's at least one other server in its row or column
            if (grid[row][column] === 1 && 
                (serversPerRow[row] > 1 || serversPerColumn[column] > 1)) {
                communicatingServers++;
            }
        }
    }
  
    return communicatingServers;
}
