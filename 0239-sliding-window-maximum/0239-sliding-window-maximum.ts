function maxSlidingWindow(nums: number[], k: number): number[] {
    const result: number[] = [];
    const deque: number[] = [];

    for (let i = 0; i < nums.length; i++) {

        // 현재 값보다 작은 값의 인덱스 제거
        while (
            deque.length > 0 &&
            nums[deque[deque.length - 1]] < nums[i]
        ) {
            deque.pop();
        }

        deque.push(i);

        // 윈도우 범위를 벗어난 인덱스 제거
        if (deque[0] <= i - k) {
            deque.shift();
        }

        // 윈도우가 완성되면 최댓값 저장
        if (i >= k - 1) {
            result.push(nums[deque[0]]);
        }
    }

    return result;
}