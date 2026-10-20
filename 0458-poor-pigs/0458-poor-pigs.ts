function poorPigs(buckets: number, minutesToDie: number, minutesToTest: number): number {
    const testRounds = Math.floor(minutesToTest / minutesToDie) + 1;
    let pigsNeeded = 0;
    let maxDistinguishableBuckets = 1;

    while (maxDistinguishableBuckets < buckets) {
        maxDistinguishableBuckets *= testRounds;
        pigsNeeded++;
    }

    return pigsNeeded;
}