/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let maxIndex = 0;
    let currentEnd = 0;
    let answer = 0;

    for (let i = 0; i < nums.length; i++) {
        maxIndex = Math.max(maxIndex, i + nums[i]);

        if (currentEnd === i && i !== nums.length - 1) {
            answer++;
            currentEnd = maxIndex;
        }
    }

    return answer;
};