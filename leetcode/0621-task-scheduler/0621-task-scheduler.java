import java.util.HashMap;
import java.util.Map;

class Solution {
    public int leastInterval(char[] tasks, int n) {
        Map<Character, Integer> map = new HashMap<>();
        int count = 0;

        for (char task : tasks) {
            map.put(task, map.getOrDefault(task, 0) + 1);
            count = Math.max(map.get(task), count);
        }

        int result = (count - 1) * (n + 1);

        for (int frequency : map.values()) {
            if (frequency == count) {
                result++;
            }
        }

        return Math.max(tasks.length, result);
    }
}