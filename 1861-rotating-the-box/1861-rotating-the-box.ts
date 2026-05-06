function rotateTheBox(box: string[][]): string[][] {
    const rows = box.length;
    const cols = box[0].length;
  
    // Create result matrix with dimensions swapped (rotated 90 degrees clockwise)
    const rotatedBox: string[][] = Array(cols).fill(null).map(() => Array(rows).fill(''));
  
    // Step 1: Rotate the box 90 degrees clockwise
    // Original position (i, j) maps to (j, rows - 1 - i) after rotation
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            rotatedBox[col][rows - row - 1] = box[row][col];
        }
    }
  
    // Step 2: Apply gravity - make stones fall down in each column
    for (let col = 0; col < rows; col++) {
        const emptyPositions: number[] = [];  // Track empty positions where stones can fall
      
        // Process from bottom to top (gravity pulls stones down)
        for (let row = cols - 1; row >= 0; row--) {
            if (rotatedBox[row][col] === '*') {
                // Obstacle found - clear all empty positions above it
                emptyPositions.length = 0;
            } 
            else if (rotatedBox[row][col] === '.') {
                // Empty space - add to available positions
                emptyPositions.push(row);
            } 
            else if (rotatedBox[row][col] === '#' && emptyPositions.length > 0) {
                // Stone found and there's an empty position below
                // Move stone to the lowest available empty position
                const targetRow = emptyPositions.shift()!;
              
                rotatedBox[targetRow][col] = '#';  // Place stone at target
                rotatedBox[row][col] = '.';         // Current position becomes empty
                emptyPositions.push(row);           // Add current position as available
            }
        }
    }
  
    return rotatedBox;
}