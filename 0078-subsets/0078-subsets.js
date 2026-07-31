/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function subsets(nums) {
    const result = [];

    function dfs(start, visited) {
        result.push([...visited]);

        for (let idx = start; idx < nums.length; idx++) {
            visited.push(nums[idx]);
            dfs(idx + 1, visited);
            visited.pop();
        }
    }

    dfs(0, []);

    return result;
}