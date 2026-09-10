/**
 * Calculates the H-index of a researcher based on their citation counts.
 *
 * @param {number[]} citations
 * @returns {number}
 */
function hIndex(citations) {
    // Sort citations in descending order
    citations.sort((a, b) => b - a);

    // Check from the largest possible h-value
    for (let h = citations.length; h > 0; h--) {
        // h papers have at least h citations
        if (citations[h - 1] >= h) {
            return h;
        }
    }

    return 0;
}