/**
 * Finds the relative ranks of athletes based on their scores.
 * Higher scores get better ranks (Gold, Silver, Bronze for top 3, then numeric ranks).
 * 
 * @param score - Array of integer scores for each athlete
 * @returns Array of strings representing the rank of each athlete at their original position
 */
function findRelativeRanks(score: number[]): string[] {
    const athleteCount: number = score.length;
  
    // Create an array of indices [0, 1, 2, ..., n-1]
    const indices: number[] = Array.from({ length: athleteCount }, (_, index) => index);
  
    // Sort indices based on scores in descending order (highest score first)
    indices.sort((indexA: number, indexB: number) => score[indexB] - score[indexA]);
  
    // Define medal names for top 3 positions
    const medalNames: string[] = ['Gold Medal', 'Silver Medal', 'Bronze Medal'];
  
    // Initialize result array to store ranks
    const ranks: string[] = Array(athleteCount);
  
    // Assign ranks based on sorted order
    for (let position: number = 0; position < athleteCount; position++) {
        const originalIndex: number = indices[position];
      
        if (position < 3) {
            // Top 3 athletes get medals
            ranks[originalIndex] = medalNames[position];
        } else {
            // Others get numeric rank (position + 1 since position is 0-indexed)
            ranks[originalIndex] = (position + 1).toString();
        }
    }
  
    return ranks;
}
