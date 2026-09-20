/**
 * Calculates the reverse degree of a string based on character positions and their distance from 'z'
 * @param s - The input string containing lowercase letters
 * @returns The sum of weighted reverse alphabetical distances
 */
function reverseDegree(s: string): number {
    // Initialize the result accumulator
    let totalScore: number = 0;
  
    // Iterate through each character position (1-indexed)
    for (let position: number = 1; position <= s.length; position++) {
        // Get the character at current position (convert to 0-indexed)
        const currentChar: string = s.charAt(position - 1);
      
        // Calculate the reverse alphabetical distance (distance from 'z')
        // 'a' = 26, 'b' = 25, ..., 'z' = 1
        const reverseAlphabeticalValue: number = 26 - (currentChar.charCodeAt(0) - 'a'.charCodeAt(0));
      
        // Add the weighted value (position * reverse alphabetical value) to the total
        totalScore += position * reverseAlphabeticalValue;
    }
  
    return totalScore;
}
