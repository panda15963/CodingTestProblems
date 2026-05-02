/**
 * Counts how many numbers from 1 to n are "good" numbers after rotation
 * A "good" number is valid when rotated 180 degrees and becomes a different number
 * @param n - The upper bound to check numbers from 1 to n
 * @returns The count of good numbers
 */
function rotatedDigits(n: number): number {
    // Mapping of digits to their 180-degree rotated values
    // -1 means the digit cannot be rotated (invalid)
    // 0->0, 1->1, 2->5, 5->2, 6->9, 8->8, 9->6
    const digitRotationMap: number[] = [0, 1, 5, -1, -1, 2, 9, -1, 8, 6];
  
    /**
     * Checks if a number is a valid "good" number after rotation
     * @param num - The number to check
     * @returns true if the number is valid and different after rotation
     */
    const isGoodNumber = (num: number): boolean => {
        let rotatedNumber = 0;
        let tempNum = num;
        let placeValue = 1;
      
        // Process each digit from right to left
        while (tempNum > 0) {
            const currentDigit = tempNum % 10;
          
            // Check if current digit can be rotated
            if (digitRotationMap[currentDigit] === -1) {
                return false;
            }
          
            // Build the rotated number from right to left
            rotatedNumber = digitRotationMap[currentDigit] * placeValue + rotatedNumber;
            placeValue *= 10;
            tempNum = Math.floor(tempNum / 10);
        }
      
        // A good number must be different after rotation
        return num !== rotatedNumber;
    };
  
    // Create array from 1 to n, filter for good numbers, and return count
    return Array.from({ length: n }, (_, index) => index + 1)
        .filter(isGoodNumber)
        .length;
}