class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backTracking(result, new ArrayList<>(), nums, nums.length);
        return result;
    }

    private void backTracking(List<List<Integer>> result,
                              List<Integer> comb,
                              int[] nums,
                              int depth) {

        if (depth == 0) {
            result.add(new ArrayList<>(comb));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (comb.contains(nums[i])) {
                continue;
            }

            comb.add(nums[i]);
            backTracking(result, comb, nums, depth - 1);
            comb.remove(comb.size() - 1);
        }
    }
}