function searchRange(nums: number[], target: number): number[] {
    const n: number = nums.length;

    if (n === 0) {
        return [-1, -1];
    }

    const findFirstTrue = (findGreater: boolean): number => {
        let left: number = 0;
        let right: number = n - 1;
        let firstTrueIndex: number = -1;

        while (left <= right) {
            const mid: number = Math.floor((left + right) / 2);
            let feasible: boolean;
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

    const firstIdx: number = findFirstTrue(false);
    if (firstIdx === -1 || nums[firstIdx] !== target) {
        return [-1, -1];
    }

    const afterLastIdx: number = findFirstTrue(true);
    let lastIdx: number;
    if (afterLastIdx === -1) {
        lastIdx = n - 1;
    } else {
        lastIdx = afterLastIdx - 1;
    }

    return [firstIdx, lastIdx];
}
