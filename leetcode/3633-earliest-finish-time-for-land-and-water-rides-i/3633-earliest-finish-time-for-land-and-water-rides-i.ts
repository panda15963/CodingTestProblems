/**
 * Calculates the earliest possible finish time by considering both paths:
 * land-first-then-water and water-first-then-land
 * @param landStartTime - Array of possible start times for land activities
 * @param landDuration - Array of durations for corresponding land activities
 * @param waterStartTime - Array of possible start times for water activities
 * @param waterDuration - Array of durations for corresponding water activities
 * @returns The minimum finish time across all possible combinations
 */
function earliestFinishTime(
    landStartTime: number[],
    landDuration: number[],
    waterStartTime: number[],
    waterDuration: number[],
): number {
    // Calculate finish time for land-first-then-water path
    const landFirstFinishTime = calc(landStartTime, landDuration, waterStartTime, waterDuration);

    // Calculate finish time for water-first-then-land path
    const waterFirstFinishTime = calc(waterStartTime, waterDuration, landStartTime, landDuration);

    // Return the minimum of both paths
    return Math.min(landFirstFinishTime, waterFirstFinishTime);
}

/**
 * Calculates the minimum finish time when completing first activity then second activity
 * @param firstStartTimes - Array of possible start times for the first activity
 * @param firstDurations - Array of durations for the first activity
 * @param secondStartTimes - Array of possible start times for the second activity
 * @param secondDurations - Array of durations for the second activity
 * @returns The minimum total finish time for this sequence
 */
function calc(
    firstStartTimes: number[],
    firstDurations: number[],
    secondStartTimes: number[],
    secondDurations: number[]
): number {
    // Find the earliest possible end time for the first activity
    let earliestFirstActivityEnd = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < firstStartTimes.length; i++) {
        earliestFirstActivityEnd = Math.min(
            earliestFirstActivityEnd,
            firstStartTimes[i] + firstDurations[i]
        );
    }

    // Find the minimum total finish time considering all second activity options
    let minimumTotalFinishTime = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < secondStartTimes.length; i++) {
        // Second activity can only start after first is complete
        const actualSecondStartTime = Math.max(earliestFirstActivityEnd, secondStartTimes[i]);
        const totalFinishTime = actualSecondStartTime + secondDurations[i];
        minimumTotalFinishTime = Math.min(minimumTotalFinishTime, totalFinishTime);
    }

    return minimumTotalFinishTime;
}