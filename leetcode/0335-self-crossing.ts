function isSelfCrossing(distance: number[]): boolean {
    // For a path to self-cross, we need at least 4 lines
    for (let i = 3; i < distance.length; i++) {
        // Case 1: 4th line crosses 1st line
        // The current line (i) crosses the line (i-3)
        // This happens when:
        // - Current line is long enough to reach back (distance[i] >= distance[i-2])
        // - Previous line doesn't extend far enough (distance[i-1] <= distance[i-3])
        if (distance[i] >= distance[i - 2] && distance[i - 1] <= distance[i - 3]) {
            return true;
        }
      
        // Case 2: 5th line crosses 2nd line
        // Check if we have at least 5 lines and the 5th line crosses the 2nd line
        // This happens when lines form a specific pattern where:
        // - The previous line equals the line 3 steps back
        // - Current line plus line 4 steps back reaches or exceeds line 2 steps back
        if (i >= 4 && 
            distance[i - 1] === distance[i - 3] && 
            distance[i] + distance[i - 4] >= distance[i - 2]) {
            return true;
        }
      
        // Case 3: 6th line crosses 3rd line
        // Check if we have at least 6 lines and the 6th line crosses the 3rd line
        // This is the most complex case with multiple conditions:
        // - Line (i-2) is at least as long as line (i-4)
        // - Line (i-1) doesn't extend beyond line (i-3)
        // - Current line is within a specific range
        // - The sum of lines forms a crossing pattern
        if (i >= 5 && 
            distance[i - 2] >= distance[i - 4] && 
            distance[i - 1] <= distance[i - 3] && 
            distance[i] >= distance[i - 2] - distance[i - 4] && 
            distance[i - 1] + distance[i - 5] >= distance[i - 3]) {
            return true;
        }
    }
  
    // No crossing detected
    return false;
}
