import java.util.*;

class Solution {
    public int solution(int[] priorities, int location) {
        Queue<int[]> queue = new LinkedList<>();

        for (int i = 0; i < priorities.length; i++) {
            queue.add(new int[]{priorities[i], i});
        }

        int count = 0;

        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            boolean hasHigher = false;

            for (int[] p : queue) {
                if (p[0] > current[0]) {
                    hasHigher = true;
                    break;
                }
            }

            if (hasHigher) {
                queue.add(current);
            } else {
                count++;
                if (current[1] == location) return count;
            }
        }

        return count;
    }
}
