/**
 * Finds the shortest beautiful substring containing exactly k '1's.
 * If multiple substrings have the same length, returns the lexicographically smallest one.
 * @param s - The input binary string
 * @param k - The required number of '1's in the substring
 * @returns The shortest beautiful substring, or empty string if none exists
 */
function shortestBeautifulSubstring(s: string, k: number): string {
    const stringLength: number = s.length;
    let shortestSubstring: string = '';
  
    // Iterate through all possible starting positions
    for (let startIndex: number = 0; startIndex < stringLength; startIndex++) {
        // Check all substrings starting from startIndex with minimum length k
        for (let endIndex: number = startIndex + k; endIndex <= stringLength; endIndex++) {
            // Extract the current substring
            const currentSubstring: string = s.slice(startIndex, endIndex);
          
            // Count the number of '1's in the current substring
            const onesCount: number = currentSubstring
                .split('')
                .filter((char: string) => char === '1')
                .length;
          
            // Check if current substring is valid and better than the current answer
            const isValidSubstring: boolean = onesCount === k;
            const isFirstValid: boolean = shortestSubstring === '';
            const isShorter: boolean = endIndex - startIndex < shortestSubstring.length;
            const isSameLengthButSmaller: boolean = 
                endIndex - startIndex === shortestSubstring.length && 
                currentSubstring < shortestSubstring;
          
            if (isValidSubstring && (isFirstValid || isShorter || isSameLengthButSmaller)) {
                shortestSubstring = currentSubstring;
            }
        }
    }
  
    return shortestSubstring;
}
