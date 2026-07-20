/**
 * Multiplies two non-negative integers represented as strings
 * @param num1 - First number as string
 * @param num2 - Second number as string
 * @returns Product of num1 and num2 as string
 */
function multiply(num1: string, num2: string): string {
    // Early return for zero multiplication
    if (num1 === '0' || num2 === '0') {
        return '0';
    }
  
    // Get lengths of input numbers
    const length1: number = num1.length;
    const length2: number = num2.length;
  
    // Initialize result array with maximum possible length
    // Product of m-digit and n-digit numbers has at most m+n digits
    const resultArray: number[] = Array(length1 + length2).fill(0);
  
    // Perform digit-by-digit multiplication from right to left
    for (let i: number = length1 - 1; i >= 0; i--) {
        const digit1: number = +num1[i];
      
        for (let j: number = length2 - 1; j >= 0; j--) {
            const digit2: number = +num2[j];
          
            // Multiply current digits and add to corresponding position
            // Position i+j+1 stores the product of digits at positions i and j
            resultArray[i + j + 1] += digit1 * digit2;
        }
    }
  
    // Handle carry propagation from right to left
    for (let i: number = resultArray.length - 1; i > 0; i--) {
        // Add carry to previous position
        resultArray[i - 1] += Math.floor(resultArray[i] / 10);
        // Keep only the last digit at current position
        resultArray[i] %= 10;
    }
  
    // Skip leading zeros in the result
    let startIndex: number = 0;
    while (startIndex < resultArray.length && resultArray[startIndex] === 0) {
        startIndex++;
    }
  
    // Convert result array to string and return
    return resultArray.slice(startIndex).join('');
}