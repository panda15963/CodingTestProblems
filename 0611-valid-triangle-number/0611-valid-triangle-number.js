/**
 * Counts the number of valid triangles that can be formed
 * from the given array of numbers.
 *
 * @param {number[]} nums - Array of positive integers
 * @returns {number} Number of valid triangles
 */
function triangleNumber(nums) {
    // 오름차순 정렬
    nums.sort((a, b) => a - b);

    const arrayLength = nums.length;
    let validTriangleCount = 0;

    // 가장 긴 변을 기준으로 탐색
    for (
        let longestSideIndex = arrayLength - 1;
        longestSideIndex >= 2;
        longestSideIndex--
    ) {
        let leftPointer = 0;
        let rightPointer = longestSideIndex - 1;

        // 투 포인터 탐색
        while (leftPointer < rightPointer) {
            // 세 변이 삼각형 조건을 만족하는 경우
            if (
                nums[leftPointer] + nums[rightPointer] >
                nums[longestSideIndex]
            ) {
                // leftPointer부터 rightPointer - 1까지 모두 유효
                validTriangleCount += rightPointer - leftPointer;

                rightPointer--;
            } else {
                // 합이 부족하면 왼쪽 포인터 이동
                leftPointer++;
            }
        }
    }

    return validTriangleCount;
}