
var findSubsequences = function(nums) {
    const ans = [];

    function dfs(u, last, t) {
        if (u === nums.length) {
            if (t.length > 1) {
                ans.push([...t]);
            }
            return;
        }

        if (nums[u] >= last) {
            t.push(nums[u]);
            dfs(u + 1, nums[u], t);
            t.pop();
        }

        if (nums[u] !== last) {
            dfs(u + 1, last, t);
        }
    }

    dfs(0, -1000, []);
    return ans;
};
