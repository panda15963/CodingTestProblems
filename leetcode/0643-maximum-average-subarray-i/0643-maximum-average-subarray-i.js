var findMaxAverage = function(nums, k) {
    // 처음 k개 원소의 합 계산
    let currentSum = 0;

    for (let i = 0; i < k; ++i) {
        currentSum += nums[i];
    }

    // 초기 최대 합 설정
    let maxSum = currentSum;

    // Sliding Window
    for (let i = k; i < nums.length; ++i) {
        // 이전 윈도우의 왼쪽 원소 제거, 새로운 원소 추가
        currentSum += nums[i] - nums[i - k];

        // 최대 합 갱신
        maxSum = Math.max(maxSum, currentSum);
    }

    // 최대 평균 반환
    return maxSum / k;
};