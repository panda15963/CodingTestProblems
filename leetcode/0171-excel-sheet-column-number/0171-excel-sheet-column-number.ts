/**
 * Converts an Excel column title to its corresponding column number.
 * For example: A -> 1, B -> 2, ..., Z -> 26, AA -> 27, AB -> 28, ...
 * 
 * @param columnTitle - The Excel column title string (e.g., "A", "AB", "ZY")
 * @returns The corresponding column number
 */
function titleToNumber(columnTitle: string): number {
    // Initialize result to store the final column number
    let result: number = 0;
  
    // Iterate through each character in the column title
    for (const character of columnTitle) {
        // Convert the current result to base 26 and add the current character's value
        // 'A' corresponds to 1, 'B' to 2, ..., 'Z' to 26
        result = result * 26 + (character.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
    }
  
    return result;
}
