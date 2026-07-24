/**
 * @param {number[]} nums
 * @return {number}
 */
var uniqueXorTriplets = function(nums) {
    const MAX = 2048;

    const pairXor = new Uint8Array(MAX);

    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            pairXor[nums[i] ^ nums[j]] = 1;
        }
    }

    const ans = new Uint8Array(MAX);

    for (let x = 0; x < MAX; x++) {
        if (!pairXor[x]) continue;

        for (const num of nums) {
            ans[x ^ num] = 1;
        }
    }

    let count = 0;
    for (const v of ans) {
        if (v) count++;
    }

    return count;
};