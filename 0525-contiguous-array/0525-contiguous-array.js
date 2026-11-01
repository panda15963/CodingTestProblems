/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function(nums) {
    const map = new Map();

    let count = 0;
    let answer = 0;

    map.set(0, -1);

    for (let i = 0; i < nums.length; i++) {
        count += nums[i] === 1 ? 1 : -1;

        if (map.has(count)) {
            answer = Math.max(answer, i - map.get(count));
        } else {
            map.set(count, i);
        }
    }

    return answer;
};