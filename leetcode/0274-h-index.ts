/**
 * Calculates the H-index of a researcher based on their citation counts.
 * H-index is the largest number h such that the researcher has h papers 
 * with at least h citations each.
 * 
 * @param citations - Array of citation counts for each paper
 * @returns The H-index value
 */
function hIndex(citations: number[]): number {
    // Sort citations in descending order to check from highest citations first
    citations.sort((a, b) => b - a);
  
    // Try each possible h-value from largest to smallest
    // h represents the potential H-index value
    for (let h = citations.length; h > 0; h--) {
        // Check if the h-th paper (0-indexed at h-1) has at least h citations
        // If true, we found the maximum h where h papers have >= h citations
        if (citations[h - 1] >= h) {
            return h;
        }
    }
  
    // If no valid H-index found, return 0
    return 0;
}
