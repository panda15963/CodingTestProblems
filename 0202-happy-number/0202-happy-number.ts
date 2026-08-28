/**
 * Determines if a number is a "happy number"
 * A happy number is defined by the following process:
 * - Starting with any positive integer, replace the number by the sum of the squares of its digits
 * - Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle
 * - Numbers for which this process ends in 1 are happy numbers
 * 
 * @param n - The number to check
 * @returns true if n is a happy number, false otherwise
 */
function isHappy(n: number): boolean {
    /**
     * Calculates the sum of squares of digits for a given number
     * For example: 19 -> 1^2 + 9^2 = 82
     * 
     * @param num - The input number
     * @returns Sum of squares of all digits
     */
    const getNext = (num: number): number => {
        let sumOfSquares: number = 0;
      
        // Extract each digit and add its square to the sum
        while (num !== 0) {
            const digit: number = num % 10;
            sumOfSquares += digit ** 2;
            num = Math.floor(num / 10);
        }
      
        return sumOfSquares;
    };
  
    // Set to track visited numbers and detect cycles
    const visitedNumbers: Set<number> = new Set<number>();
  
    // Continue the process until we reach 1 (happy) or find a cycle (not happy)
    while (n !== 1) {
        const nextNumber: number = getNext(n);
      
        // If we've seen this number before, we're in a cycle
        if (visitedNumbers.has(nextNumber)) {
            return false;
        }
      
        // Track this number as visited
        visitedNumbers.add(nextNumber);
      
        // Move to the next number in the sequence
        n = nextNumber;
    }
  
    // We reached 1, so it's a happy number
    return true;
}
