function nextGreaterElement(n: number): number {
    // Convert number to string for digit manipulation
    const digits: string[] = n.toString().split('');
    const length: number = digits.length;
  
    // Step 1: Find the rightmost digit that is smaller than its next digit
    // This is the pivot point where we need to make a change
    let pivotIndex: number = length - 2;
    while (pivotIndex >= 0 && digits[pivotIndex] >= digits[pivotIndex + 1]) {
        pivotIndex--;
    }
  
    // If no such digit exists, the number is already the largest permutation
    if (pivotIndex < 0) {
        return -1;
    }
  
    // Step 2: Find the smallest digit to the right of pivot that is larger than pivot
    // This digit will be swapped with the pivot
    let swapIndex: number = length - 1;
    while (digits[pivotIndex] >= digits[swapIndex]) {
        swapIndex--;
    }
  
    // Step 3: Swap the pivot with the found digit
    [digits[pivotIndex], digits[swapIndex]] = [digits[swapIndex], digits[pivotIndex]];
  
    // Step 4: Reverse all digits after the pivot position to get the smallest permutation
    // This ensures we get the next greater element, not just any greater element
    const leftPart: string[] = digits.slice(0, pivotIndex + 1);
    const rightPart: string[] = digits.slice(pivotIndex + 1).reverse();
    const resultDigits: string[] = [...leftPart, ...rightPart];
  
    // Convert back to number and check for integer overflow
    const result: number = parseInt(resultDigits.join(''));
  
    // Return -1 if the result exceeds 32-bit integer range (2^31 - 1)
    const MAX_INT: number = 2147483647;
    return result > MAX_INT ? -1 : result;
}
