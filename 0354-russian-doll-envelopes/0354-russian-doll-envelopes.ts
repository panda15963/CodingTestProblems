function maxEnvelopes(envelopes: number[][]): number {
    // Sort envelopes by width ascending, and if widths are equal, by height descending
    // The height descending ensures we don't mistakenly nest envelopes with same width
    envelopes.sort((envelope1, envelope2) => {
        if (envelope1[0] !== envelope2[0]) {
            return envelope1[0] - envelope2[0];
        }
        return envelope2[1] - envelope1[1];
    });
  
    const numEnvelopes = envelopes.length;
  
    // LIS array to track the smallest ending height for each subsequence length
    const lisHeights: number[] = [envelopes[0][1]];
  
    // Process remaining envelopes to find LIS of heights
    for (let i = 1; i < numEnvelopes; i++) {
        const currentHeight = envelopes[i][1];
      
        // If current height is larger than all previous, extend the sequence
        if (currentHeight > lisHeights[lisHeights.length - 1]) {
            lisHeights.push(currentHeight);
        } else {
            // Find the position to replace with current height using binary search
            const replaceIndex = lowerBound(lisHeights, currentHeight);
          
            // Update the height at found position
            lisHeights[replaceIndex] = currentHeight;
        }
    }
  
    // The size of LIS array represents the maximum number of nested envelopes
    return lisHeights.length;
}

// Helper function to find the leftmost position where target can be inserted
function lowerBound(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length;
  
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
  
    return left;
}
