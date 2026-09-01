/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    const n = nums.length;

    // k번째 큰 수 → 오름차순으로 정렬했을 때 (n - k)번째 인덱스
    k = n - k;

    const quickSort = (l, r) => {
        // 범위에 원소가 하나만 남은 경우
        if (l === r) {
            return nums[l];
        }

        let i = l - 1;
        let j = r + 1;

        // 중앙값을 Pivot으로 선택
        const x = nums[(l + r) >> 1];

        // Hoare Partition
        while (i < j) {
            while (nums[++i] < x);
            while (nums[--j] > x);

            if (i < j) {
                [nums[i], nums[j]] = [
                    nums[j],
                    nums[i]
                ];
            }
        }

        // 원하는 인덱스가 오른쪽에 있는 경우
        if (j < k) {
            return quickSort(j + 1, r);
        }

        // 원하는 인덱스가 왼쪽에 있는 경우
        return quickSort(l, j);
    };

    return quickSort(0, n - 1);
};