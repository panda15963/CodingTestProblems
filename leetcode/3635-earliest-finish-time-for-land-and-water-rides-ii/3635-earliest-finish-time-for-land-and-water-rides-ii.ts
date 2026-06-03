/**
 * Calculates the earliest finish time by considering both possible orders:
 * land tasks first then water tasks, or water tasks first then land tasks.
 *
 * @param landStartTime - Array of start times for land tasks
 * @param landDuration - Array of durations for land tasks
 * @param waterStartTime - Array of start times for water tasks
 * @param waterDuration - Array of durations for water tasks
 * @returns The minimum finish time across both possible orderings
 */
function earliestFinishTime(
    landStartTime: number[],
    landDuration: number[],
    waterStartTime: number[],
    waterDuration: number[],
): number {
    // Calculate finish time when doing land tasks first, then water tasks
    const landFirstFinishTime = calc(landStartTime, landDuration, waterStartTime, waterDuration);

    // Calculate finish time when doing water tasks first, then land tasks
    const waterFirstFinishTime = calc(waterStartTime, waterDuration, landStartTime, landDuration);

    // Return the minimum of both possible orderings
    return Math.min(landFirstFinishTime, waterFirstFinishTime);
}

/**
 * Calculates the minimum finish time when completing first set of tasks
 * before starting the second set of tasks.
 *
 * @param firstStartTimes - Start times for the first set of tasks
 * @param firstDurations - Durations for the first set of tasks
 * @param secondStartTimes - Start times for the second set of tasks
 * @param secondDurations - Durations for the second set of tasks
 * @returns The minimum finish time for this ordering
 */
function calc(
    firstStartTimes: number[],
    firstDurations: number[],
    secondStartTimes: number[],
    secondDurations: number[]
): number {
    // Find the earliest completion time among all first tasks
    let earliestFirstTaskCompletion = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < firstStartTimes.length; i++) {
        const taskEndTime = firstStartTimes[i] + firstDurations[i];
        earliestFirstTaskCompletion = Math.min(earliestFirstTaskCompletion, taskEndTime);
    }

    // Find the minimum total completion time considering all second tasks
    let minimumTotalTime = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < secondStartTimes.length; i++) {
        // Second task can only start after both: first tasks complete AND its own start time
        const actualSecondTaskStart = Math.max(earliestFirstTaskCompletion, secondStartTimes[i]);
        const totalCompletionTime = actualSecondTaskStart + secondDurations[i];
        minimumTotalTime = Math.min(minimumTotalTime, totalCompletionTime);
    }

    return minimumTotalTime;
}
