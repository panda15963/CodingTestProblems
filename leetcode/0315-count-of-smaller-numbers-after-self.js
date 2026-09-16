var countSmaller = function(nums) {
    const n = nums.length;

    if (n === 0) {
        return [];
    }

    let minValue = nums[0];
    let maxValue = nums[0];

    for (const num of nums) {
        minValue = Math.min(minValue, num);
        maxValue = Math.max(maxValue, num);
    }

    for (let i = 0; i < n; i++) {
        nums[i] = nums[i] - minValue + 1;
    }

    const maxIndex = maxValue - minValue + 1;
    const tree = new Array(maxIndex + 1).fill(0);
    const ans = new Array(n);

    const increase = (i) => {
        while (i <= maxIndex) {
            tree[i]++;
            i += i & -i;
        }
    };

    const get = (i) => {
        let count = 0;

        while (i > 0) {
            count += tree[i];
            i -= i & -i;
        }

        return count;
    };

    for (let i = n - 1; i >= 0; i--) {
        ans[i] = get(nums[i] - 1);
        increase(nums[i]);
    }

    return ans;
};