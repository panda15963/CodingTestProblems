/**
 * Distributes candies between Alice and Bob, where Alice wants to maximize 
 * the number of different candy types she can eat.
 * 
 * @param candyType - Array of integers where each integer represents a candy type
 * @returns Maximum number of different candy types Alice can eat
 */
function distributeCandies(candyType: number[]): number {
    // Create a set to store unique candy types
    const uniqueCandyTypes: Set<number> = new Set(candyType);
  
    // Calculate the maximum number of candies Alice can eat (half of total)
    const maxCandiesAliceCanEat: number = candyType.length >> 1; // Bitwise right shift for division by 2
  
    // Return the minimum between unique candy types and half the total candies
    // This ensures Alice doesn't eat more than allowed while maximizing variety
    return Math.min(uniqueCandyTypes.size, maxCandiesAliceCanEat);
}
