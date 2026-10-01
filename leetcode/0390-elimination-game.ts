function lastRemaining(n: number): number {
    // Track the first and last elements of the remaining sequence
    let firstElement: number = 1;
    let lastElement: number = n;
  
    // Step size between consecutive elements in the current sequence
    let stepSize: number = 1;
  
    // Iteration counter (even = left-to-right, odd = right-to-left)
    let iteration: number = 0;
  
    // Count of remaining elements
    let remainingCount: number = n;
  
    // Continue until only one element remains
    while (remainingCount > 1) {
        if (iteration % 2 === 0) {
            // Left-to-right elimination
            // Always update the first element
            firstElement += stepSize;
          
            // Update last element only if count is odd
            // (the last element gets eliminated when count is odd)
            if (remainingCount % 2 === 1) {
                lastElement -= stepSize;
            }
        } else {
            // Right-to-left elimination
            // Always update the last element
            lastElement -= stepSize;
          
            // Update first element only if count is odd
            // (the first element gets eliminated when count is odd)
            if (remainingCount % 2 === 1) {
                firstElement += stepSize;
            }
        }
      
        // Prepare for next iteration
        remainingCount = Math.floor(remainingCount / 2);  // Half the elements remain after each pass
        stepSize *= 2;                                     // Double the step size between elements
        iteration++;                                        // Move to next iteration
    }
  
    // When only one element remains, firstElement equals lastElement
    return firstElement;
}
