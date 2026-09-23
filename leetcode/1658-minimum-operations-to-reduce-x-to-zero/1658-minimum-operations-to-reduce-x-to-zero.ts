function minOperations(nums: number[], x: number): number {
    // 전체 합 - x = 가운데에 남겨야 하는 부분 배열의 합
    let targetSum: number = -x;

    for (const num of nums) {
        targetSum += num;
    }

    // prefix sum -> 첫 등장 인덱스
    const prefixSumToIndex: Map<number, number> = new Map();
    prefixSumToIndex.set(0, -1);

    let maxLength: number = -1;
    let currentPrefixSum: number = 0;
    const n: number = nums.length;

    for (let i = 0; i < n; i++) {
        currentPrefixSum += nums[i];

        // 첫 번째 등장 위치만 저장
        if (!prefixSumToIndex.has(currentPrefixSum)) {
            prefixSumToIndex.set(currentPrefixSum, i);
        }

        const previousSum: number =
            currentPrefixSum - targetSum;

        if (prefixSumToIndex.has(previousSum)) {
            const subarrayLength: number =
                i - prefixSumToIndex.get(previousSum)!;

            maxLength = Math.max(
                maxLength,
                subarrayLength
            );
        }
    }

    return maxLength === -1
        ? -1
        : n - maxLength;
}