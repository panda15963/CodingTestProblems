/**
 * Finds the minimum time difference between any two time points in minutes
 * @param timePoints - Array of time strings in "HH:MM" format
 * @returns The minimum difference in minutes between any two time points
 */
function findMinDifference(timePoints: string[]): number {
    // If there are more than 1440 time points (total minutes in a day),
    // by pigeonhole principle, at least two must be the same
    if (timePoints.length > 1440) {
        return 0;
    }
  
    const timePointCount: number = timePoints.length;
    // Create array with extra slot for circular comparison
    const minutesArray: number[] = new Array(timePointCount + 1);
  
    // Convert all time strings to minutes since midnight
    for (let i = 0; i < timePointCount; i++) {
        const [hours, minutes] = timePoints[i].split(':').map(Number);
        minutesArray[i] = hours * 60 + minutes;
    }
  
    // Sort times in ascending order
    minutesArray.sort((a, b) => a - b);
  
    // Add first time + 1440 (24 hours) to handle circular difference
    // This allows comparison between last and first time across midnight
    minutesArray[timePointCount] = minutesArray[0] + 1440;
  
    // Initialize minimum difference with a large value (2^30)
    let minimumDifference: number = 1 << 30;
  
    // Compare each adjacent pair of times to find minimum difference
    for (let i = 1; i <= timePointCount; i++) {
        minimumDifference = Math.min(minimumDifference, minutesArray[i] - minutesArray[i - 1]);
    }
  
    return minimumDifference;
}
