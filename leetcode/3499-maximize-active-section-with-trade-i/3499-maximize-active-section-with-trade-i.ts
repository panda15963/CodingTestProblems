/**
 * Calculates the maximum number of active sections after performing one trade operation.
 * A trade operation allows swapping adjacent segments of 0s and 1s.
 * 
 * @param s - Binary string containing only '0' and '1' characters
 * @returns Maximum number of active sections (1s) after optimal trade
 */
function maxActiveSectionsAfterTrade(s: string): number {
    const stringLength: number = s.length;
    let totalOnes: number = 0;  // Total count of '1' characters
    let maxGain: number = 0;    // Maximum gain from merging '0' segments with adjacent '1' segments
    let previousZeroSegmentLength: number = Number.MIN_SAFE_INTEGER;  // Length of previous '0' segment

    // Iterate through the string by segments of same characters
    for (let currentIndex: number = 0; currentIndex < stringLength; ) {
        // Find the end of current segment with same character
        let nextIndex: number = currentIndex + 1;
        while (nextIndex < stringLength && s[nextIndex] === s[currentIndex]) {
            nextIndex++;
        }
      
        // Calculate the length of current segment
        const currentSegmentLength: number = nextIndex - currentIndex;
      
        if (s[currentIndex] === '1') {
            // If current segment contains '1's, add to total count
            totalOnes += currentSegmentLength;
        } else {
            // If current segment contains '0's, calculate potential gain from merging
            // with adjacent '1' segments (previous '0' segment + current '0' segment)
            maxGain = Math.max(maxGain, previousZeroSegmentLength + currentSegmentLength);
            previousZeroSegmentLength = currentSegmentLength;
        }
      
        // Move to the next segment
        currentIndex = nextIndex;
    }

    // Return total '1's plus the maximum gain from one trade
    return totalOnes + maxGain;
}