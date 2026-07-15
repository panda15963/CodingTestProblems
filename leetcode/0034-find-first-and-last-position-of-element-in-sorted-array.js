var searchRange = function(nums, target) {
    const n = nums.length;

    if (n === 0) {
        return [-1, -1];
    }

    const findFirstTrue = (findGreater) => {
        let left = 0;
        let right = n - 1;
        let firstTrueIndex = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            let feasible;

            if (findGreater) {
                feasible = nums[mid] > target;
            } else {
                feasible = nums[mid] >= target;
            }

            if (feasible) {
                firstTrueIndex = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        return firstTrueIndex;
    };

    const firstIdx = findFirstTrue(false);

    if (firstIdx === -1 || nums[firstIdx] !== target) {
        return [-1, -1];
    }

    const afterLastIdx = findFirstTrue(true);

    let lastIdx;

    if (afterLastIdx === -1) {
        lastIdx = n - 1;
    } else {
        lastIdx = afterLastIdx - 1;
    }

    return [firstIdx, lastIdx];
};