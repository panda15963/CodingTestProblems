class Solution {
    private List<List<Integer>> result = new ArrayList<>();
    private List<Integer> current = new ArrayList<>();
    private Map<Integer, Integer> count = new HashMap<>();

    public List<List<Integer>> permuteUnique(int[] nums) {
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        backTracking(nums.length);
        return result;
    }

    private void backTracking(int size) {
        if (size == 0) {
            result.add(new ArrayList<>(current));
            return;
        }

        for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
            int num = entry.getKey();
            int freq = entry.getValue();

            if (freq == 0) {
                continue;
            }

            count.put(num, freq - 1);
            current.add(num);

            backTracking(size - 1);

            current.remove(current.size() - 1);
            count.put(num, freq);
        }
    }
}