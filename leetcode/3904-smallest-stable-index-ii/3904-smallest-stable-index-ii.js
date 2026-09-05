function firstStableIndex(nums, k) {
    const n = nums.length;
    const right = new Array(n);

    right[n - 1] = nums[n - 1];

    // 오른쪽부터 각 위치까지의 최솟값 계산
    for (let i = n - 2; i >= 0; i--) {
        right[i] = Math.min(right[i + 1], nums[i]);
    }

    let left = 0;

    // 왼쪽부터 최댓값을 유지하며 조건 확인
    for (let i = 0; i < n; i++) {
        left = Math.max(left, nums[i]);

        if (left - right[i] <= k) {
            return i;
        }
    }

    return -1;
}