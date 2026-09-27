var splitArray = function(nums, k) {
    let left = Math.max(...nums);
    let right = nums.reduce((acc, num) => acc + num, 0);

    const feasible = (maxSum) => {
        let currentSum = 0;
        let subarrayCount = 1;

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

    let firstTrueIndex = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (feasible(mid)) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return firstTrueIndex;
};