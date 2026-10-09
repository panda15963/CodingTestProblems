function findMaximumXOR(nums: number[]): number {
    let maxXor = 0;
    let mask = 0;

    for (let bit = 30; bit >= 0; bit--) {
        mask |= 1 << bit;

        const prefixes = new Set<number>();

        for (const num of nums) {
            prefixes.add(num & mask);
        }

        const candidate = maxXor | (1 << bit);

        for (const prefix of prefixes) {
            if (prefixes.has(prefix ^ candidate)) {
                maxXor = candidate;
                break;
            }
        }
    }

    return maxXor;
}