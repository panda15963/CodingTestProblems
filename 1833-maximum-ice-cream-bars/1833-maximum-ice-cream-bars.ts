/**
 * Calculates the maximum number of ice cream bars that can be purchased with given coins
 * @param costs - Array of ice cream bar prices
 * @param coins - Total amount of money available
 * @returns Maximum number of ice cream bars that can be purchased
 */
function maxIceCream(costs: number[], coins: number): number {
    // Sort the costs array in ascending order to buy cheapest ice creams first
    costs.sort((a: number, b: number) => a - b);
  
    // Store the total number of ice cream bars available
    const totalIceCreams: number = costs.length;
  
    // Iterate through sorted costs and buy ice creams while we have enough coins
    for (let i: number = 0; i < totalIceCreams; i++) {
        // Check if we have enough coins for the current ice cream
        if (coins < costs[i]) {
            // Not enough coins, return the count of ice creams bought so far
            return i;
        }
      
        // Deduct the cost of current ice cream from available coins
        coins -= costs[i];
    }
  
    // All ice creams were purchased successfully
    return totalIceCreams;
}
