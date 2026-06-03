function earliestFinishTime(
    landStartTime,
    landDuration,
    waterStartTime,
    waterDuration
) {
    const landFirstFinishTime = calc(
        landStartTime,
        landDuration,
        waterStartTime,
        waterDuration
    );

    const waterFirstFinishTime = calc(
        waterStartTime,
        waterDuration,
        landStartTime,
        landDuration
    );

    return Math.min(landFirstFinishTime, waterFirstFinishTime);
}

function calc(
    firstStartTimes,
    firstDurations,
    secondStartTimes,
    secondDurations
) {
    let earliestFirstTaskCompletion = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < firstStartTimes.length; i++) {
        const taskEndTime = firstStartTimes[i] + firstDurations[i];
        earliestFirstTaskCompletion = Math.min(
            earliestFirstTaskCompletion,
            taskEndTime
        );
    }

    let minimumTotalTime = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < secondStartTimes.length; i++) {
        const actualSecondTaskStart = Math.max(
            earliestFirstTaskCompletion,
            secondStartTimes[i]
        );
        const totalCompletionTime =
            actualSecondTaskStart + secondDurations[i];

        minimumTotalTime = Math.min(
            minimumTotalTime,
            totalCompletionTime
        );
    }

    return minimumTotalTime;
}