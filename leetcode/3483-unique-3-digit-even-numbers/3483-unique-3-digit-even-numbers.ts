/**
 * Counts unique three-digit numbers where:
 * - The last digit (ones place) is even
 * - The first digit (hundreds place) is non-zero
 * - All three digits come from different positions in the input array
 * 
 * @param digits - Array of single digits (0-9)
 * @returns The count of unique valid three-digit numbers
 */
function totalNumbers(digits: number[]): number {
    // Set to store unique three-digit numbers
    const uniqueNumbers = new Set<number>();
    const arrayLength = digits.length;
  
    // Iterate through all positions for the ones place (last digit)
    for (let onesIndex = 0; onesIndex < arrayLength; ++onesIndex) {
        // Skip if the ones digit is odd (must be even)
        if (digits[onesIndex] % 2 === 1) {
            continue;
        }
      
        // Iterate through all positions for the tens place (middle digit)
        for (let tensIndex = 0; tensIndex < arrayLength; ++tensIndex) {
            // Skip if using the same position as ones digit
            if (onesIndex === tensIndex) {
                continue;
            }
          
            // Iterate through all positions for the hundreds place (first digit)
            for (let hundredsIndex = 0; hundredsIndex < arrayLength; ++hundredsIndex) {
                // Skip if:
                // - The hundreds digit is 0 (invalid for first digit)
                // - Using the same position as ones or tens digit
                if (digits[hundredsIndex] === 0 || 
                    hundredsIndex === onesIndex || 
                    hundredsIndex === tensIndex) {
                    continue;
                }
              
                // Construct the three-digit number and add to set
                const threeDigitNumber = digits[hundredsIndex] * 100 + 
                                        digits[tensIndex] * 10 + 
                                        digits[onesIndex];
                uniqueNumbers.add(threeDigitNumber);
            }
        }
    }
  
    // Return the count of unique numbers
    return uniqueNumbers.size;
}
