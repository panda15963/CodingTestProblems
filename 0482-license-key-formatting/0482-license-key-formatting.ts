/**
 * Formats a license key by removing dashes and regrouping characters
 * @param s - The license key string to format
 * @param k - The number of characters in each group (except possibly the first group)
 * @returns The formatted license key with uppercase letters and dashes between groups
 */
function licenseKeyFormatting(s: string, k: number): string {
    const stringLength: number = s.length;
  
    // Calculate the number of dashes in the original string
    const dashMatches: RegExpMatchArray | null = s.match(/-/g);
    const dashCount: number = dashMatches ? dashMatches.length : 0;
  
    // Calculate the size of the first group
    // If total characters divides evenly by k, first group has k characters
    // Otherwise, first group has the remainder
    const totalCharacters: number = stringLength - dashCount;
    let firstGroupSize: number = totalCharacters % k || k;
  
    const result: string[] = [];
  
    // Iterate through each character in the original string
    for (let index: number = 0; index < stringLength; index++) {
        const currentChar: string = s[index];
      
        // Skip dashes from the original string
        if (currentChar === '-') {
            continue;
        }
      
        // Add the uppercase version of the character
        result.push(currentChar.toUpperCase());
      
        // Decrement the counter for the current group
        firstGroupSize--;
      
        // If we've completed a group and not at the end, add a dash
        if (firstGroupSize === 0) {
            firstGroupSize = k; // Reset counter for next group
            if (index !== stringLength - 1) {
                result.push('-');
            }
        }
    }
  
    // Remove any trailing dashes that may have been added
    while (result.at(-1) === '-') {
        result.pop();
    }
  
    // Join the array into a final string
    return result.join('');
}
