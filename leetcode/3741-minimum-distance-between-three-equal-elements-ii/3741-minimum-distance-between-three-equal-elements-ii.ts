function minimumDistance(nums: number[]): number {
    const pos = new Map<number, number[]>();
    let ans = Infinity;

    for (let i = 0; i < nums.length; i++) {
        const x = nums[i];
        if (!pos.has(x)) pos.set(x, []);
        const arr = pos.get(x)!;
        arr.push(i);

        if (arr.length >= 3) {
            ans = Math.min(ans, arr[arr.length - 1] - arr[arr.length - 3]);
        }
    }

    return ans === Infinity ? -1 : ans * 2;
}