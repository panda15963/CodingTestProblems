function missingNumber(nums: number[]): number {
    let sum: number = 0;
    let arr: number = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += i;
        arr += nums[i];
    }

    return sum + nums.length - arr;
}