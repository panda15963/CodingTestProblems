var predictTheWinner = function(nums) {
    const n = nums.length;
    const f = Array.from({ length: n }, () => Array(n).fill(0));

    const dfs = function(i, j) {
        if (i > j) {
            return 0;
        }

        if (f[i][j] === 0) {
            f[i][j] = Math.max(
                nums[i] - dfs(i + 1, j),
                nums[j] - dfs(i, j - 1)
            );
        }

        return f[i][j];
    };

    return dfs(0, n - 1) >= 0;
};