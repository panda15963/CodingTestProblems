/**
 * Counts the number of pattern strings that are substrings of the given word
 * @param patterns - Array of pattern strings to check
 * @param word - The word to search within for pattern occurrences
 * @returns The count of patterns that appear as substrings in word
 */
function numOfStrings(patterns: string[], word: string): number {
    // Filter patterns array to keep only those that exist as substrings in word
    // Then return the length of the filtered array
    return patterns.filter((pattern: string) => word.includes(pattern)).length;
}