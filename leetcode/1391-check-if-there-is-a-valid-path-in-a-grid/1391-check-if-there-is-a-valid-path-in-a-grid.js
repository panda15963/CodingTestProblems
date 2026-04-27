let parent = [];  // Union-Find parent array

function hasValidPath(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
  
    // Initialize Union-Find structure
    parent = new Array(rows * cols);
    for (let i = 0; i < parent.length; i++) {
        parent[i] = i;
    }
  
    // Function to connect current cell with left neighbor if compatible
    const connectLeft = (row, col) => {
        if (col > 0 && (grid[row][col - 1] === 1 || 
                       grid[row][col - 1] === 4 || 
                       grid[row][col - 1] === 6)) {
            union(row * cols + col, row * cols + col - 1);
        }
    };
  
    // Function to connect current cell with right neighbor if compatible
    const connectRight = (row, col) => {
        if (col < cols - 1 && (grid[row][col + 1] === 1 || 
                               grid[row][col + 1] === 3 || 
                               grid[row][col + 1] === 5)) {
            union(row * cols + col, row * cols + col + 1);
        }
    };
  
    // Function to connect current cell with upper neighbor if compatible
    const connectUp = (row, col) => {
        if (row > 0 && (grid[row - 1][col] === 2 || 
                       grid[row - 1][col] === 3 || 
                       grid[row - 1][col] === 4)) {
            union(row * cols + col, (row - 1) * cols + col);
        }
    };
  
    // Function to connect current cell with lower neighbor if compatible
    const connectDown = (row, col) => {
        if (row < rows - 1 && (grid[row + 1][col] === 2 || 
                               grid[row + 1][col] === 5 || 
                               grid[row + 1][col] === 6)) {
            union(row * cols + col, (row + 1) * cols + col);
        }
    };
  
    // Process each cell in the grid
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const streetType = grid[row][col];
          
            // Connect to neighbors based on street type
            if (streetType === 1) {
                connectLeft(row, col);
                connectRight(row, col);
            } else if (streetType === 2) {
                connectUp(row, col);
                connectDown(row, col);
            } else if (streetType === 3) {
                connectLeft(row, col);
                connectDown(row, col);
            } else if (streetType === 4) {
                connectRight(row, col);
                connectDown(row, col);
            } else if (streetType === 5) {
                connectLeft(row, col);
                connectUp(row, col);
            } else { // Type 6
                connectRight(row, col);
                connectUp(row, col);
            }
        }
    }
  
    // Check if start cell (0,0) and end cell (m-1,n-1) are connected
    return find(0) === find(rows * cols - 1);
}

// Find operation with path compression
function find(x) {
    if (parent[x] !== x) {
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

// Union operation by rank (added for efficiency)
function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
        parent[rootX] = rootY;
    }
}