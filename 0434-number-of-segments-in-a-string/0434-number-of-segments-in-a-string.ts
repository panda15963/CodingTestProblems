/**
 * Counts the number of segments in a string.
 * A segment is defined as a contiguous sequence of non-space characters.
 * 
 * @param s - The input string to count segments from
 * @returns The number of segments in the string
 */
function countSegments(s: string): number {
    // Split the string by one or more whitespace characters
    // Filter out empty strings to get only non-empty segments
    // Return the count of segments
    return s.split(/\s+/).filter(Boolean).length;
}
