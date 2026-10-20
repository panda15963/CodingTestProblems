var poorPigs = function(buckets, minutesToDie, minutesToTest) {
    const testRounds = Math.floor(minutesToTest / minutesToDie) + 1;
    let pigsNeeded = 0;
    let maxDistinguishableBuckets = 1;

    while (maxDistinguishableBuckets < buckets) {
        maxDistinguishableBuckets *= testRounds;
        pigsNeeded++;
    }

    return pigsNeeded;
};