function missingNumber(nums) {
    let sum = 0;
    let arr = 0;

    for (let i = 0; i < nums.length; i++) {
        sum += i;
        arr += nums[i];
    }

    return sum + nums.length - arr;
}