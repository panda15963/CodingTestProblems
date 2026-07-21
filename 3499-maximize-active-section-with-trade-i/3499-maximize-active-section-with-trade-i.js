/**
 * Calculates the maximum number of active sections after performing one trade operation.
 *
 * @param {string} s
 * @return {number}
 */
var maxActiveSectionsAfterTrade = function(s) {
    const stringLength = s.length;

    // Total count of '1's
    let totalOnes = 0;

    // Maximum gain from one trade
    let maxGain = 0;

    // Length of previous '0' segment
    let previousZeroSegmentLength = Number.MIN_SAFE_INTEGER;

    // Iterate through segments of consecutive identical characters
    for (let currentIndex = 0; currentIndex < stringLength; ) {
        // Find the end of the current segment
        let nextIndex = currentIndex + 1;

        while (
            nextIndex < stringLength &&
            s[nextIndex] === s[currentIndex]
        ) {
            nextIndex++;
        }

        // Length of current segment
        const currentSegmentLength = nextIndex - currentIndex;

        if (s[currentIndex] === '1') {
            // Count total number of '1's
            totalOnes += currentSegmentLength;
        } else {
            // Update the maximum gain
            maxGain = Math.max(
                maxGain,
                previousZeroSegmentLength + currentSegmentLength
            );

            previousZeroSegmentLength = currentSegmentLength;
        }

        // Move to the next segment
        currentIndex = nextIndex;
    }

    return totalOnes + maxGain;
};