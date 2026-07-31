class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        dfs(0, new ArrayList<>(), nums, result);
        return result;
    }

    private void dfs(int start, List<Integer> visited,
                     int[] nums, List<List<Integer>> result) {
        result.add(new ArrayList<>(visited));

        for (int idx = start; idx < nums.length; idx++) {
            visited.add(nums[idx]);
            dfs(idx + 1, visited, nums, result);
            visited.remove(visited.size() - 1);
        }
    }
}