function splitArray(nums: number[], k: number): number {
    let left: number = Math.max(...nums);
    let right: number = nums.reduce((acc, num) => acc + num, 0);

    const feasible = (maxSum: number): boolean => {
        let currentSum: number = 0;
        let subarrayCount: number = 1;

        for (const num of nums) {
            if (currentSum + num > maxSum) {
                currentSum = num;
                subarrayCount++;
            } else {
                currentSum += num;
            }
        }

        return subarrayCount <= k;
    };

    let firstTrueIndex: number = -1;

    while (left <= right) {
        const mid: number = Math.floor((left + right) / 2);
        if (feasible(mid)) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return firstTrueIndex;
}
