/**
 * Finds the largest overlap between two binary images after translation
 * @param img1 - First binary image represented as 2D array
 * @param img2 - Second binary image represented as 2D array
 * @returns Maximum number of overlapping 1s after optimal translation
 */
function largestOverlap(img1: number[][], img2: number[][]): number {
    const imageSize: number = img1.length;
  
    // Map to store translation vectors and their corresponding overlap counts
    // Key: encoded translation vector (row_offset * 200 + col_offset)
    // Value: count of overlapping 1s for this translation
    const translationCountMap: Map<number, number> = new Map();
  
    let maxOverlap: number = 0;
  
    // Iterate through all positions with value 1 in img1
    for (let row1 = 0; row1 < imageSize; ++row1) {
        for (let col1 = 0; col1 < imageSize; ++col1) {
            if (img1[row1][col1] === 1) {
              
                // For each 1 in img1, check all possible overlaps with 1s in img2
                for (let row2 = 0; row2 < imageSize; ++row2) {
                    for (let col2 = 0; col2 < imageSize; ++col2) {
                        if (img2[row2][col2] === 1) {
                          
                            // Calculate translation vector from img1 position to img2 position
                            // Encode as single number: row_offset * 200 + col_offset
                            // 200 is chosen as it's larger than max possible offset (n < 100)
                            const translationKey: number = (row1 - row2) * 200 + (col1 - col2);
                          
                            // Increment count for this translation vector
                            const currentCount: number = (translationCountMap.get(translationKey) ?? 0) + 1;
                            translationCountMap.set(translationKey, currentCount);
                          
                            // Update maximum overlap found so far
                            maxOverlap = Math.max(maxOverlap, currentCount);
                        }
                    }
                }
            }
        }
    }
  
    return maxOverlap;
}
