function uniqueXorTriplets(nums: number[]): number {
    const n = nums.length;

    if (n < 3) {
        return n;
    }

    const x = Math.floor(Math.log(n) / Math.log(2));

    return 1 << (x + 1);
}