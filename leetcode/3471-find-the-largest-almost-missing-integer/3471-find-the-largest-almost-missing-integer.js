/**
 * Finds the largest integer that appears exactly once
 * @param {number[]} nums
 * @param {number} k
 * @returns {number}
 */
function largestInteger(nums, k) {
    // k가 1인 경우
    if (k === 1) {
        const frequencyMap = new Map();

        // 각 숫자의 등장 횟수 계산
        for (const num of nums) {
            frequencyMap.set(
                num,
                (frequencyMap.get(num) || 0) + 1
            );
        }

        // 정확히 한 번 등장하는 가장 큰 숫자 찾기
        let maxUniqueNumber = -1;

        for (const [num, frequency] of frequencyMap.entries()) {
            if (frequency === 1 && num > maxUniqueNumber) {
                maxUniqueNumber = num;
            }
        }

        return maxUniqueNumber;
    }

    const arrayLength = nums.length;

    // k가 배열의 길이와 같다면 최댓값 반환
    if (k === arrayLength) {
        return Math.max(...nums);
    }

    /**
     * 해당 인덱스의 숫자가 배열 전체에서 유일한지 확인
     *
     * @param {number} index
     * @returns {number}
     */
    const getUniqueNumberAtIndex = (index) => {
        for (let i = 0; i < arrayLength; i++) {
            // 자기 자신을 제외하고 같은 숫자가 있는지 확인
            if (i !== index && nums[i] === nums[index]) {
                return -1;
            }
        }

        return nums[index];
    };

    // 첫 번째와 마지막 원소 중 유일한 값의 최댓값 반환
    return Math.max(
        getUniqueNumberAtIndex(0),
        getUniqueNumberAtIndex(arrayLength - 1)
    );
}