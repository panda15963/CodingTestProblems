function summaryRanges(nums) {
    const f = (i, j) => {
        return i === j
            ? `${nums[i]}`
            : `${nums[i]}->${nums[j]}`;
    };

    const n = nums.length;
    const ans = [];

    for (let i = 0, j = 0; i < n; i = j + 1) {
        j = i;

        // 연속된 숫자가 끝나는 위치 찾기
        while (
            j + 1 < n &&
            nums[j + 1] === nums[j] + 1
        ) {
            ++j;
        }

        ans.push(f(i, j));
    }

    return ans;
}