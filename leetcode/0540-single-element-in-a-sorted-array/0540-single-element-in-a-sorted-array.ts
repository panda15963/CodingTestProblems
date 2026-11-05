function singleNonDuplicate(nums: number[]): number {
    const map: Map<number, number> = new Map();

    for (const num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    for (const num of nums) {
        if (map.get(num) === 1) {
            return num;
        }
    }

    return -1;
}