/**
 * Calculates the nth Fibonacci number using an iterative approach
 * @param n - The position in the Fibonacci sequence (0-indexed)
 * @returns The nth Fibonacci number
 */
function fib(n: number): number {
    // Initialize the first two Fibonacci numbers
    // currentFib represents F(0), nextFib represents F(1)
    let currentFib: number = 0;
    let nextFib: number = 1;
  
    // Iterate n times to calculate the nth Fibonacci number
    while (n > 0) {
        // Store the next Fibonacci number in a temporary variable
        const tempFib: number = nextFib;
      
        // Calculate the new next Fibonacci number by summing current and next
        nextFib = currentFib + nextFib;
      
        // Move forward in the sequence: current becomes the old next
        currentFib = tempFib;
      
        // Decrement the counter
        n--;
    }
  
    // Return the nth Fibonacci number
    return currentFib;
}
