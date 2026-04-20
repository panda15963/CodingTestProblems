function maxDistance(colors: number[]): number {
    // Get the size of the colors array
    const n: number = colors.length;
    let maxDist: number = 0;
  
    // Strategy: The maximum distance must involve either the first or last element
    // Check distances from the first element
    for (let i = n - 1; i > 0; i--) {
        if (colors[0] !== colors[i]) {
            maxDist = Math.max(maxDist, i);
            break;  // Found the farthest element different from first
        }
    }
  
    // Check distances from the last element
    for (let i = 0; i < n - 1; i++) {
        if (colors[n - 1] !== colors[i]) {
            maxDist = Math.max(maxDist, n - 1 - i);
            break;  // Found the farthest element different from last
        }
    }
  
    return maxDist;
}