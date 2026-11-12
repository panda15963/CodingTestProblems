/**
 * Finds all points on the convex hull of a set of trees (points)
 * Uses Andrew's monotone chain algorithm to build the convex hull
 * @param trees - Array of points represented as [x, y] coordinates
 * @returns Array of points that form the convex hull
 */
function outerTrees(trees: number[][]): number[][] {
    const n = trees.length;
  
    // If less than 4 points, all points are on the convex hull
    if (n < 4) {
        return trees;
    }
  
    // Sort points lexicographically (first by x, then by y)
    trees.sort((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });
  
    // Track which points have been added to the hull
    const used: boolean[] = new Array(n).fill(false);
  
    // Array to store indices of points on the convex hull
    const hull: number[] = new Array(n + 10);
    let hullSize = 1;  // Start with the leftmost point (index 0)
    hull[0] = 0;
  
    // Build lower hull (left to right)
    for (let i = 1; i < n; i++) {
        // Remove points that create a right turn (negative cross product)
        // We want to keep only left turns or collinear points
        while (hullSize > 1 && 
               calculateCrossProduct(trees[hull[hullSize - 2]], 
                                   trees[hull[hullSize - 1]], 
                                   trees[i]) < 0) {
            hullSize--;
            used[hull[hullSize]] = false;
        }
        used[i] = true;
        hull[hullSize] = i;
        hullSize++;
    }
  
    // Mark the size of lower hull
    const lowerHullSize = hullSize;
  
    // Build upper hull (right to left)
    for (let i = n - 1; i >= 0; i--) {
        // Skip points already in lower hull
        if (used[i]) {
            continue;
        }
      
        // Remove points that create a right turn when building upper hull
        while (hullSize > lowerHullSize && 
               calculateCrossProduct(trees[hull[hullSize - 2]], 
                                   trees[hull[hullSize - 1]], 
                                   trees[i]) < 0) {
            hullSize--;
        }
        hull[hullSize] = i;
        hullSize++;
    }
  
    // Construct result from hull indices
    // Last point is duplicate of first point, so exclude it
    const result: number[][] = [];
    for (let i = 0; i < hullSize - 1; i++) {
        result.push(trees[hull[i]]);
    }
  
    return result;
}

/**
 * Calculate cross product of vectors AB and BC
 * @param pointA - First point
 * @param pointB - Second point (shared between both vectors)
 * @param pointC - Third point
 * @returns Cross product value:
 *          Positive: left turn
 *          Negative: right turn
 *          Zero: collinear points
 */
function calculateCrossProduct(pointA: number[], pointB: number[], pointC: number[]): number {
    // Calculate vector AB
    const vectorAB_x = pointB[0] - pointA[0];
    const vectorAB_y = pointB[1] - pointA[1];
  
    // Calculate vector BC
    const vectorBC_x = pointC[0] - pointB[0];
    const vectorBC_y = pointC[1] - pointB[1];
  
    // Return cross product: AB × BC
    return vectorAB_x * vectorBC_y - vectorAB_y * vectorBC_x;
}
