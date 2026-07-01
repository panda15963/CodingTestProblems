// Parent array for Union-Find data structure
let parent: number[];
// Number of connected components
let componentCount: number;

/**
 * Find the root parent of element x with path compression
 * @param x - The element to find the root for
 * @returns The root parent of element x
 */
function find(x: number): number {
    if (parent[x] !== x) {
        // Path compression: make x point directly to root
        parent[x] = find(parent[x]);
    }
    return parent[x];
}

/**
 * Union two elements into the same set
 * @param a - First element
 * @param b - Second element
 * @returns true if union was performed, false if already in same set
 */
function union(a: number, b: number): boolean {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA !== rootB) {
        // Merge the two sets by making one root point to the other
        parent[rootA] = rootB;
        componentCount--;
        return true;
    }
    return false;
}

/**
 * Find the maximum safeness factor for a path from top-left to bottom-right
 * The safeness factor is the minimum distance to any thief (cell with value 1)
 * @param grid - 2D grid where 1 represents a thief and 0 represents empty cell
 * @returns Maximum safeness factor of any valid path
 */
function maximumSafenessFactor(grid: number[][]): number {
    const gridSize = grid.length;

    // If start or end position has a thief, no safe path exists
    if (grid[0][0] === 1 || grid[gridSize - 1][gridSize - 1] === 1) {
        return 0;
    }

    // Queue for BFS to calculate distances
    const bfsQueue: number[][] = [];
    const infinity = 1 << 30;

    // Initialize distance matrix with infinity
    const distanceMatrix: number[][] = Array(gridSize)
        .fill(0)
        .map(() => Array(gridSize).fill(infinity));

    // Find all thieves and add them to BFS queue
    for (let row = 0; row < gridSize; ++row) {
        for (let col = 0; col < gridSize; ++col) {
            if (grid[row][col] === 1) {
                distanceMatrix[row][col] = 0;
                bfsQueue.push([row, col]);
            }
        }
    }

    // Direction vectors for moving up, right, down, left
    const directions = [-1, 0, 1, 0, -1];

    // BFS to calculate minimum distance from each cell to nearest thief
    while (bfsQueue.length > 0) {
        const [currentRow, currentCol] = bfsQueue.shift()!;

        for (let dir = 0; dir < 4; ++dir) {
            const nextRow = currentRow + directions[dir];
            const nextCol = currentCol + directions[dir + 1];

            // Check if next position is valid and unvisited
            if (nextRow >= 0 && nextRow < gridSize &&
                nextCol >= 0 && nextCol < gridSize &&
                distanceMatrix[nextRow][nextCol] === infinity) {

                distanceMatrix[nextRow][nextCol] = distanceMatrix[currentRow][currentCol] + 1;
                bfsQueue.push([nextRow, nextCol]);
            }
        }
    }

    // Create array of cells with their safeness values
    const cellsWithSafeness: number[][] = [];
    for (let row = 0; row < gridSize; ++row) {
        for (let col = 0; col < gridSize; ++col) {
            cellsWithSafeness.push([distanceMatrix[row][col], row, col]);
        }
    }

    // Sort cells by safeness value in descending order
    cellsWithSafeness.sort((a, b) => b[0] - a[0]);

    // Initialize Union-Find for all cells
    const totalCells = gridSize * gridSize;
    parent = Array(totalCells)
        .fill(0)
        .map((_, index) => index);
    componentCount = totalCells;

    // Process cells from highest to lowest safeness value
    for (const [safeness, row, col] of cellsWithSafeness) {
        // Try to connect with adjacent cells that have >= safeness value
        for (let dir = 0; dir < 4; ++dir) {
            const adjacentRow = row + directions[dir];
            const adjacentCol = col + directions[dir + 1];

            // Check if adjacent cell is valid and has sufficient safeness
            if (adjacentRow >= 0 && adjacentRow < gridSize &&
                adjacentCol >= 0 && adjacentCol < gridSize &&
                distanceMatrix[adjacentRow][adjacentCol] >= safeness) {

                // Convert 2D coordinates to 1D index
                union(row * gridSize + col, adjacentRow * gridSize + adjacentCol);
            }
        }

        // Check if start and end are connected
        if (find(0) === find(totalCells - 1)) {
            return safeness;
        }
    }

    return 0;
}