function intersection(nums1: number[], nums2: number[]): number[] {
    const set1: Set<number> = new Set(nums1);
    const set2: Set<number> = new Set(nums2);

    const result: number[] = [];

    for (const num of set1) {
        if (set2.has(num)) {
            result.push(num);
        }
    }

    return result;
}