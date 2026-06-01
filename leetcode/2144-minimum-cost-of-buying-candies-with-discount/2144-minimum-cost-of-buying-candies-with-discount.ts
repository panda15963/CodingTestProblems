/**
 * Calculates the minimum cost when buying items with a "buy 2 get 1 free" promotion.
 * The strategy is to group items in sets of 3, where the cheapest item in each group is free.
 * 
 * @param cost - Array of item costs
 * @returns The minimum total cost after applying the promotion
 */
function minimumCost(cost: number[]): number {
    // Sort the costs in ascending order
    cost.sort((a: number, b: number) => a - b);
  
    // Initialize the total cost accumulator
    let totalCost: number = 0;
  
    // Iterate from the most expensive item, moving backwards by 3 items at a time
    // This ensures we get the most expensive items while making the cheapest ones free
    for (let i: number = cost.length - 1; i >= 0; i -= 3) {
        // Add the most expensive item in the current group of 3
        totalCost += cost[i];
      
        // Add the second most expensive item if it exists
        // The third item (cheapest) in the group is free
        if (i > 0) {
            totalCost += cost[i - 1];
        }
    }
  
    return totalCost;
}