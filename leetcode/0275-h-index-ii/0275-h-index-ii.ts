/**
 * Calculate the H-index using the binary search template.
 * Feasible condition: citations[mid] >= n - mid
 */
function hIndex(citations: number[]): number {
    const n: number = citations.length;
    if (n === 0) {
        return 0;
    }

    // Binary search template
    let left: number = 0;
    let right: number = n - 1;
    let firstTrueIndex: number = -1;

    while (left <= right) {
        const mid: number = Math.floor((left + right) / 2);

        // Feasible: does paper at mid have enough citations?
        if (citations[mid] >= n - mid) {
            firstTrueIndex = mid;
            right = mid - 1;  // Search for earlier feasible position
        } else {
            left = mid + 1;
        }
    }

    // Return h-index
    return firstTrueIndex !== -1 ? n - firstTrueIndex : 0;
}
