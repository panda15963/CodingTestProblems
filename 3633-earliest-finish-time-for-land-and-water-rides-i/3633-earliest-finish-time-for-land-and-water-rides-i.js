/**
 * Calculates the earliest possible finish time by considering both paths:
 * land-first-then-water and water-first-then-land
 */
function earliestFinishTime(
    landStartTime,
    landDuration,
    waterStartTime,
    waterDuration
) {
    const landFirstFinishTime = calc(landStartTime, landDuration, waterStartTime, waterDuration);
    const waterFirstFinishTime = calc(waterStartTime, waterDuration, landStartTime, landDuration);

    return Math.min(landFirstFinishTime, waterFirstFinishTime);
}

/**
 * Calculates the minimum finish time when completing first activity then second activity
 */
function calc(
    firstStartTimes,
    firstDurations,
    secondStartTimes,
    secondDurations
) {
    let earliestFirstActivityEnd = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < firstStartTimes.length; i++) {
        earliestFirstActivityEnd = Math.min(
            earliestFirstActivityEnd,
            firstStartTimes[i] + firstDurations[i]
        );
    }

    let minimumTotalFinishTime = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < secondStartTimes.length; i++) {
        const actualSecondStartTime = Math.max(
            earliestFirstActivityEnd,
            secondStartTimes[i]
        );
        const totalFinishTime = actualSecondStartTime + secondDurations[i];
        minimumTotalFinishTime = Math.min(minimumTotalFinishTime, totalFinishTime);
    }

    return minimumTotalFinishTime;
}