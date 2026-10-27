var findPoisonedDuration = function(timeSeries, duration) {
    const n = timeSeries.length;
    if (n === 0) {
        return 0;
    }

    let ans = duration;

    for (let i = 1; i < n; i++) {
        ans += Math.min(duration, timeSeries[i] - timeSeries[i - 1]);
    }

    return ans;
};