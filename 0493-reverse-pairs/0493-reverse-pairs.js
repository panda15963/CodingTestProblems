var reversePairs = function(nums) {
    const n = nums.length;
    const temp = new Array(n);

    const mergeSort = (left, right) => {
        if (left >= right) {
            return 0;
        }

        const mid = Math.floor((left + right) / 2);

        let count =
            mergeSort(left, mid) +
            mergeSort(mid + 1, right);

        // Count reverse pairs
        let i = left;
        let j = mid + 1;

        while (i <= mid && j <= right) {
            if (nums[i] <= 2 * nums[j]) {
                i++;
            } else {
                count += mid - i + 1;
                j++;
            }
        }

        // Merge the two sorted halves
        i = left;
        j = mid + 1;
        let k = 0;

        while (i <= mid && j <= right) {
            if (nums[i] <= nums[j]) {
                temp[k++] = nums[i++];
            } else {
                temp[k++] = nums[j++];
            }
        }

        while (i <= mid) {
            temp[k++] = nums[i++];
        }

        while (j <= right) {
            temp[k++] = nums[j++];
        }

        // Copy sorted elements back
        for (let p = left; p <= right; p++) {
            nums[p] = temp[p - left];
        }

        return count;
    };

    return mergeSort(0, n - 1);
};