var minSubArrayLen = function(target, nums) {
    const n = nums.length;

    // prefixSum[i] = nums[0] ~ nums[i - 1]의 합
    const prefixSum = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefixSum[i + 1] = prefixSum[i] + nums[i];
    }

    // 만들 수 없는 값으로 초기화
    let minLength = n + 1;

    // 각 시작 위치 i에 대해 이분 탐색
    for (let i = 0; i <= n; i++) {
        // prefixSum[j] >= prefixSum[i] + target인
        // 가장 작은 j를 찾는다.
        let left = i;
        let right = n;
        let firstTrueIndex = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (prefixSum[mid] >= prefixSum[i] + target) {
                firstTrueIndex = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        // 유효한 구간을 찾았다면 최소 길이 갱신
        if (firstTrueIndex !== -1) {
            minLength = Math.min(
                minLength,
                firstTrueIndex - i
            );
        }
    }

    // 조건을 만족하는 부분 배열이 없으면 0
    return minLength === n + 1 ? 0 : minLength;
};