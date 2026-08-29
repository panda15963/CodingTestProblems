/**
 * Returns the lexicographically smallest array by swapping elements
 * within a limit constraint.
 *
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
function lexicographicallySmallestArray(nums, limit) {
    const arrayLength = nums.length;

    // [0, 1, 2, ..., n-1] 인덱스 배열 생성
    const indices = Array.from(
        { length: arrayLength },
        (_, index) => index
    );

    // nums의 값을 기준으로 인덱스 정렬
    indices.sort((indexA, indexB) => {
        return nums[indexA] - nums[indexB];
    });

    // 결과 배열
    const result = Array(arrayLength).fill(0);

    let currentIndex = 0;

    while (currentIndex < arrayLength) {
        // 현재 그룹의 끝 찾기
        let groupEndIndex = currentIndex + 1;

        while (
            groupEndIndex < arrayLength &&
            nums[indices[groupEndIndex]] -
                nums[indices[groupEndIndex - 1]] <= limit
        ) {
            groupEndIndex++;
        }

        // 현재 그룹의 원래 위치들을 오름차순 정렬
        const sortedGroupIndices = indices
            .slice(currentIndex, groupEndIndex)
            .sort((a, b) => a - b);

        // 작은 값부터 가장 앞쪽 위치에 배치
        for (
            let k = currentIndex;
            k < groupEndIndex;
            k++
        ) {
            result[sortedGroupIndices[k - currentIndex]] =
                nums[indices[k]];
        }

        currentIndex = groupEndIndex;
    }

    return result;
}