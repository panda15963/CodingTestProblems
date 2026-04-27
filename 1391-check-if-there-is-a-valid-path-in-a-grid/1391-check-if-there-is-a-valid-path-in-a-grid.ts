let parent: number[] = [];  // Union-Find parent array

function hasValidPath(grid: number[][]): boolean {
    const rows: number = grid.length;
    const cols: number = grid[0].length;
  
    // Initialize Union-Find structure
    // Each cell is initially its own parent
    parent = new Array(rows * cols);
    for (let i = 0; i < parent.length; i++) {
        parent[i] = i;
    }
  
    // Function to connect current cell with left neighbor if compatible
    const connectLeft = (row: number, col: number): void => {
        // Check if left neighbor exists and has right-facing connection
        // Street types 1, 4, 6 have right-facing connections
        if (col > 0 && (grid[row][col - 1] === 1 || 
                       grid[row][col - 1] === 4 || 
                       grid[row][col - 1] === 6)) {
            parent[find(row * cols + col)] = find(row * cols + col - 1);
        }
    };
  
    // Function to connect current cell with right neighbor if compatible
    const connectRight = (row: number, col: number): void => {
        // Check if right neighbor exists and has left-facing connection
        // Street types 1, 3, 5 have left-facing connections
        if (col < cols - 1 && (grid[row][col + 1] === 1 || 
                               grid[row][col + 1] === 3 || 
                               grid[row][col + 1] === 5)) {
            parent[find(row * cols + col)] = find(row * cols + col + 1);
        }
    };
  
    // Function to connect current cell with upper neighbor if compatible
    const connectUp = (row: number, col: number): void => {
        // Check if upper neighbor exists and has down-facing connection
        // Street types 2, 3, 4 have down-facing connections
        if (row > 0 && (grid[row - 1][col] === 2 || 
                       grid[row - 1][col] === 3 || 
                       grid[row - 1][col] === 4)) {
            parent[find(row * cols + col)] = find((row - 1) * cols + col);
        }
    };
  
    // Function to connect current cell with lower neighbor if compatible
    const connectDown = (row: number, col: number): void => {
        // Check if lower neighbor exists and has up-facing connection
        // Street types 2, 5, 6 have up-facing connections
        if (row < rows - 1 && (grid[row + 1][col] === 2 || 
                               grid[row + 1][col] === 5 || 
                               grid[row + 1][col] === 6)) {
            parent[find(row * cols + col)] = find((row + 1) * cols + col);
        }
    };
  
    // Process each cell in the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const streetType: number = grid[row][col];
          
            // Connect to neighbors based on street type
            // Type 1: horizontal street (left-right)
            if (streetType === 1) {
                connectLeft(row, col);
                connectRight(row, col);
            }
            // Type 2: vertical street (up-down)
            else if (streetType === 2) {
                connectUp(row, col);
                connectDown(row, col);
            }
            // Type 3: L-shaped street (left-down)
            else if (streetType === 3) {
                connectLeft(row, col);
                connectDown(row, col);
            }
            // Type 4: reversed L-shaped street (right-down)
            else if (streetType === 4) {
                connectRight(row, col);
                connectDown(row, col);
            }
            // Type 5: reversed L-shaped street (left-up)
            else if (streetType === 5) {
                connectLeft(row, col);
                connectUp(row, col);
            }
            // Type 6: L-shaped street (right-up)
            else {
                connectRight(row, col);
                connectUp(row, col);
            }
        }
    }
  
    // Check if start cell (0,0) and end cell (m-1,n-1) are connected
    return find(0) === find(rows * cols - 1);
}

// Find operation with path compression for Union-Find
function find(x: number): number {
    if (parent[x] !== x) {
        parent[x] = find(parent[x]);  // Path compression
    }
    return parent[x];
}
