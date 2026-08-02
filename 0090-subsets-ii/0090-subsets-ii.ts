function subsetsWithDup(nums: number[]): number[][] {
    const countMap = new Map<number, number>();

    for (const num of nums) {
        countMap.set(num, (countMap.get(num) ?? 0) + 1);
    }

    const entries = Array.from(countMap.entries());

    function helper(index: number): number[][] {
        if (index === entries.length) {
            return [[]];
        }

        const [num, count] = entries[index];
        const lastSets = helper(index + 1);

        const result: number[][] = [...lastSets];

        for (let i = 1; i <= count; i++) {
            for (const subset of lastSets) {
                result.push([...subset, ...Array(i).fill(num)]);
            }
        }

        return result;
    }

    return helper(0);
}