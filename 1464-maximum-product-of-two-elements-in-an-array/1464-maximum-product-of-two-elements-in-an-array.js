/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    const arrayLength = nums.length;

    // 앞의 두 자리만 선택 정렬하여 가장 큰 두 수를 찾음
    for (let currentPosition = 0; currentPosition < 2; currentPosition++) {
        let maxElementIndex = currentPosition;

        // 현재 위치 이후에서 가장 큰 원소 찾기
        for (let searchIndex = currentPosition + 1; searchIndex < arrayLength; searchIndex++) {
            if (nums[searchIndex] > nums[maxElementIndex]) {
                maxElementIndex = searchIndex;
            }
        }

        // 가장 큰 원소를 현재 위치와 교환
        [nums[currentPosition], nums[maxElementIndex]] =
            [nums[maxElementIndex], nums[currentPosition]];
    }

    // (가장 큰 수 - 1) * (두 번째로 큰 수 - 1)
    return (nums[0] - 1) * (nums[1] - 1);
};