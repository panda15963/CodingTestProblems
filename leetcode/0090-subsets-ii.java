import java.util.*;

class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Map<Integer, Integer> countMap = new HashMap<>();
        for (int num : nums) {
            countMap.put(num, countMap.getOrDefault(num, 0) + 1);
        }

        List<Map.Entry<Integer, Integer>> entries =
                new ArrayList<>(countMap.entrySet());

        return helper(entries, 0);
    }

    private List<List<Integer>> helper(List<Map.Entry<Integer, Integer>> entries, int index) {
        if (index == entries.size()) {
            List<List<Integer>> base = new ArrayList<>();
            base.add(new ArrayList<>());
            return base;
        }

        Map.Entry<Integer, Integer> entry = entries.get(index);
        int num = entry.getKey();
        int count = entry.getValue();

        List<List<Integer>> lastSets = helper(entries, index + 1);
        List<List<Integer>> result = new ArrayList<>(lastSets);

        for (int i = 1; i <= count; i++) {
            for (List<Integer> subset : lastSets) {
                List<Integer> newSubset = new ArrayList<>(subset);
                for (int j = 0; j < i; j++) {
                    newSubset.add(num);
                }
                result.add(newSubset);
            }
        }

        return result;
    }
}