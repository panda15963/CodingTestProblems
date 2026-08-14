function singleNumber(nums: number[]): number {
    let ones: number = 0;
    let twos: number = 0;

    for (const n of nums) {
        ones = (~twos) & (ones ^ n);
        twos = (~ones) & (twos ^ n);
    }

    return ones;
}