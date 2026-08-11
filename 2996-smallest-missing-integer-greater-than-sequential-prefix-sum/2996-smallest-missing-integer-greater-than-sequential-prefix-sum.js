var missingInteger = function (nums) {
    // 첫 번째 원소부터 연속되는 수들의 합
    let consecutiveSum = nums[0];

    // 연속된 부분의 합 계산
    for (
        let index = 1;
        index < nums.length && nums[index] === nums[index - 1] + 1;
        index++
    ) {
        consecutiveSum += nums[index];
    }

    // 배열에 존재하는 숫자를 Set에 저장
    const existingNumbers = new Set(nums);

    // consecutiveSum 이상이면서 배열에 존재하지 않는 가장 작은 수 찾기
    for (let candidate = consecutiveSum; ; candidate++) {
        if (!existingNumbers.has(candidate)) {
            return candidate;
        }
    }
};