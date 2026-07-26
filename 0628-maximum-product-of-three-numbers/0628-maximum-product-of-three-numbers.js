/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
    // 오름차순 정렬
    nums.sort((a, b) => a - b);

    const arrayLength = nums.length;

    // 가장 큰 세 수의 곱
    const productOfThreeLargest =
        nums[arrayLength - 1] *
        nums[arrayLength - 2] *
        nums[arrayLength - 3];

    // 가장 작은 두 수와 가장 큰 수의 곱
    const productOfTwoSmallestAndLargest =
        nums[0] *
        nums[1] *
        nums[arrayLength - 1];

    // 두 경우 중 더 큰 값 반환
    return Math.max(
        productOfThreeLargest,
        productOfTwoSmallestAndLargest
    );
};