/**
 * @param {character[][]} matrix
 * @return {number}
 */
function maximalRectangle(matrix) {
    if (!matrix || matrix.length === 0) {
        return 0;
    }

    const numCols = matrix[0].length;
    const heights = new Array(numCols).fill(0);
    let maxArea = 0;

    // Process each row to build histogram heights
    for (const row of matrix) {
        for (let col = 0; col < numCols; col++) {
            if (row[col] === "1") {
                // Increment height if current cell is '1'
                heights[col]++;
            } else {
                // Reset height if current cell is '0'
                heights[col] = 0;
            }
        }

        // Calculate max rectangle area for current histogram
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }

    return maxArea;
}

/**
 * @param {number[]} heights
 * @return {number}
 */
function largestRectangleArea(heights) {
    let maxArea = 0;
    const n = heights.length;
    const indexStack = [];

    // Nearest smaller element indices
    const leftBoundary = new Array(n).fill(-1);
    const rightBoundary = new Array(n).fill(n);

    // Find left and right boundaries
    for (let i = 0; i < n; i++) {
        while (
            indexStack.length > 0 &&
            heights[indexStack[indexStack.length - 1]] >= heights[i]
        ) {
            const poppedIndex = indexStack.pop();
            rightBoundary[poppedIndex] = i;
        }

        if (indexStack.length > 0) {
            leftBoundary[i] = indexStack[indexStack.length - 1];
        }

        indexStack.push(i);
    }

    // Calculate the maximum rectangle area
    for (let i = 0; i < n; i++) {
        const width = rightBoundary[i] - leftBoundary[i] - 1;
        const area = heights[i] * width;
        maxArea = Math.max(maxArea, area);
    }

    return maxArea;
}