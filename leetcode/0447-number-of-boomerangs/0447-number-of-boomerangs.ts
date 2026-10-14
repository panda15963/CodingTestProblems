/**
 * Counts the number of boomerang tuples (i, j, k) where the distance 
 * from point i to j equals the distance from point i to k.
 * 
 * @param points - Array of 2D points where each point is [x, y]
 * @returns The total number of boomerang tuples
 */
function numberOfBoomerangs(points: number[][]): number {
    let totalBoomerangs = 0;
  
    // For each point as the center point of potential boomerangs
    for (const [centerX, centerY] of points) {
        // Map to store frequency of distances from the center point
        const distanceFrequencyMap: Map<number, number> = new Map();
      
        // Calculate distances from center point to all other points
        for (const [targetX, targetY] of points) {
            // Calculate squared Euclidean distance (avoid sqrt for efficiency)
            const squaredDistance = (centerX - targetX) ** 2 + (centerY - targetY) ** 2;
          
            // If we've seen this distance before, we can form boomerangs
            // with all previous points at the same distance
            const currentFrequency = distanceFrequencyMap.get(squaredDistance) || 0;
            totalBoomerangs += currentFrequency;
          
            // Update the frequency count for this distance
            distanceFrequencyMap.set(squaredDistance, currentFrequency + 1);
        }
    }
  
    // Multiply by 2 because each boomerang (i, j, k) can also be (i, k, j)
    return totalBoomerangs << 1;
}
