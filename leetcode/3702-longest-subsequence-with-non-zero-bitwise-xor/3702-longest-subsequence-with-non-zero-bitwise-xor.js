function longestSubsequence(nums) {
    let x = 0;
    const res = nums.length;
    let isAllZero = true;

    for (const n of nums) {
        x ^= n;

        if (n !== 0 && isAllZero) {
            isAllZero = false;
        }
    }

    if (isAllZero) {
        return 0;
    }

    if (x !== 0) {
        return res;
    }

    return res - 1;
}