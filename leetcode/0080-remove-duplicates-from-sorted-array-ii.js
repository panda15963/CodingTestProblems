/**
 * @param {number[]} nums
 * @return {number}
 */
function removeDuplicates(nums) {
    if (nums.length <= 2) {
        return nums.length;
    }

    let idx = 1;
    let cnt = 1;

    for (let i = 1; i < nums.length; i++) {
        // 현재 원소가 이전 원소와 같은 경우
        if (nums[i - 1] === nums[i]) {
            cnt++;

            // 최대 2개까지 허용
            if (cnt <= 2) {
                nums[idx++] = nums[i];
            }
        } else {
            // 다른 원소라면 카운트 초기화
            cnt = 1;
            nums[idx++] = nums[i];
        }
    }

    return idx;
}