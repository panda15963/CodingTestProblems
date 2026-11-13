/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countNonDecreasingSubarrays = function(nums, k) {
    let ans = 0;
    let cost = 0;

    const n = nums.length;

    // Deque를 배열로 구현
    // [head, tail) 범위가 현재 덱의 원소
    const dq = new Array(2 * n + 5);
    let head = n + 2;
    let tail = n + 2;

    for (let i = n - 1, j = n - 1; i >= 0; i--) {
        const num = nums[i];
        let count = 1;

        // 뒤에서부터 num보다 작은 원소들을 병합
        while (head < tail && dq[tail - 1].num < num) {
            const nextNum = dq[tail - 1].num;
            const nextCount = dq[tail - 1].count;

            tail--;
            count += nextCount;

            // nextNum을 num으로 조정하는 비용
            cost += (num - nextNum) * nextCount;
        }

        // 덱의 뒤에 새로운 원소 추가
        dq[tail++] = { num, count };

        // 비용이 k를 초과하면 윈도우 축소
        while (cost > k) {
            const rightmostNum = dq[head].num;
            const rightmostCount = dq[head].count;

            head++;

            cost -= rightmostNum - nums[j];
            j--;

            if (rightmostCount > 1) {
                dq[--head] = {
                    num: rightmostNum,
                    count: rightmostCount - 1
                };
            }
        }

        // 현재 위치에서 만들 수 있는 부분 배열 개수
        ans += j - i + 1;
    }

    return ans;
};