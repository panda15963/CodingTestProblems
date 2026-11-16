/**
 * Performs k-length digit sum transformation on a string until its length is at most k
 * @param s - The input string containing digits
 * @param k - The group size for digit sum transformation
 * @returns The final transformed string
 */
function digitSum(s: string, k: number): string {
    // Continue transforming while string length exceeds k
    while (s.length > k) {
        // Array to store sum of each k-length group
        const groupSums: number[] = [];
      
        // Process string in groups of k characters
        for (let startIndex = 0; startIndex < s.length; startIndex += k) {
            // Extract k characters (or remaining characters if less than k)
            const group = s.slice(startIndex, startIndex + k);
          
            // Calculate sum of digits in current group
            const digitSum = group
                .split('')
                .reduce((accumulator, digit) => accumulator + Number(digit), 0);
          
            // Add the sum to results array
            groupSums.push(digitSum);
        }
      
        // Convert array of sums back to string for next iteration
        s = groupSums.join('');
    }
  
    return s;
}
