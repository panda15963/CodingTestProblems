function permuteUnique(nums: number[]): number[][] {
    const result: number[][] = [];
    const current: number[] = [];
    const count: Map<number, number> = new Map();

    for (const num of nums) {
        count.set(num, (count.get(num) ?? 0) + 1);
    }

    const backTracking = (size: number): void => {
        if (size === 0) {
            result.push([...current]);
            return;
        }

        for (const [num, freq] of count) {
            if (freq === 0) {
                continue;
            }

            count.set(num, freq - 1);
            current.push(num);

            backTracking(size - 1);

            current.pop();
            count.set(num, freq);
        }
    };

    backTracking(nums.length);

    return result;
}