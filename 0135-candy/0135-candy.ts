/**
 * Distributes minimum number of candies to children based on ratings
 * Each child must receive at least one candy
 * Children with higher ratings get more candies than their neighbors
 * 
 * @param ratings - Array of children's ratings
 * @returns Minimum number of candies needed
 */
function candy(ratings: number[]): number {
    const n: number = ratings.length;
  
    // Track minimum candies needed based on left neighbor comparison
    const leftToRight: number[] = new Array(n).fill(1);
  
    // Track minimum candies needed based on right neighbor comparison
    const rightToLeft: number[] = new Array(n).fill(1);
  
    // First pass: left to right
    // If current child has higher rating than left neighbor, give one more candy
    for (let i: number = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            leftToRight[i] = leftToRight[i - 1] + 1;
        }
    }
  
    // Second pass: right to left
    // If current child has higher rating than right neighbor, give one more candy
    for (let i: number = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            rightToLeft[i] = rightToLeft[i + 1] + 1;
        }
    }
  
    // Calculate total candies needed
    // Take maximum of both passes to satisfy both left and right neighbor constraints
    let totalCandies: number = 0;
    for (let i: number = 0; i < n; i++) {
        totalCandies += Math.max(leftToRight[i], rightToLeft[i]);
    }
  
    return totalCandies;
}