function minMirrorPairDistance(nums: number[]): number {
    const lookup = new Map<number, number>();
    let result = Number.MAX_SAFE_INTEGER;

    const reverse = (n: number): number => {
        let r = 0;
        while (n > 0) {
            r = r * 10 + (n % 10);
            n = Math.floor(n / 10);
        }
        return r;
    };

    for (let i = 0; i < nums.length; i++) {
        if (lookup.has(nums[i])) {
            result = Math.min(result, i - lookup.get(nums[i])!);
        }
        lookup.set(reverse(nums[i]), i);
    }

    return result !== Number.MAX_SAFE_INTEGER ? result : -1;
}