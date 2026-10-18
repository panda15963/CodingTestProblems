/**
 * Assigns cookies to children based on greed factor
 * Uses greedy algorithm to maximize the number of content children
 * 
 * @param g - Array of children's greed factors (minimum cookie size needed)
 * @param s - Array of cookie sizes available
 * @returns Number of children that can be made content
 */
function findContentChildren(g: number[], s: number[]): number {
    // Sort both arrays in ascending order for greedy matching
    g.sort((a: number, b: number) => a - b);
    s.sort((a: number, b: number) => a - b);
  
    // Store array lengths for iteration
    const childrenCount: number = g.length;
    const cookieCount: number = s.length;
  
    // Track current child index and cookie index
    let childIndex: number = 0;
    let cookieIndex: number = 0;
  
    // Iterate through each child
    for (childIndex = 0; childIndex < childrenCount; childIndex++) {
        // Find the smallest cookie that can satisfy current child
        while (cookieIndex < cookieCount && s[cookieIndex] < g[childIndex]) {
            cookieIndex++;
        }
      
        // If no more cookies available, return number of satisfied children
        if (cookieIndex >= cookieCount) {
            return childIndex;
        }
      
        // Assign cookie to child and move to next cookie
        cookieIndex++;
    }
  
    // All children were satisfied
    return childrenCount;
}
