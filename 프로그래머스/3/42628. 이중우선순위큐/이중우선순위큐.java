import java.util.*;

class Solution {
    public int[] solution(String[] operations) {
        PriorityQueue<int[]> minQ = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) return a[0] - b[0];
            return a[1] - b[1];
        });
        PriorityQueue<int[]> maxQ = new PriorityQueue<>((a, b) -> {
            if (a[0] != b[0]) return b[0] - a[0];
            return a[1] - b[1];
        });
        boolean[] removed = new boolean[operations.length];
        int id = 0;

        for (String op : operations) {
            String[] parts = op.split(" ");
            if (parts[0].equals("I")) {
                int value = Integer.parseInt(parts[1]);
                minQ.offer(new int[]{value, id});
                maxQ.offer(new int[]{value, id});
                id++;
            } else if (parts[1].equals("1")) {
                while (!maxQ.isEmpty() && removed[maxQ.peek()[1]]) maxQ.poll();
                if (!maxQ.isEmpty()) {
                    removed[maxQ.poll()[1]] = true;
                }
            } else {
                while (!minQ.isEmpty() && removed[minQ.peek()[1]]) minQ.poll();
                if (!minQ.isEmpty()) {
                    removed[minQ.poll()[1]] = true;
                }
            }
        }

        while (!minQ.isEmpty() && removed[minQ.peek()[1]]) minQ.poll();
        while (!maxQ.isEmpty() && removed[maxQ.peek()[1]]) maxQ.poll();

        if (minQ.isEmpty() || maxQ.isEmpty()) return new int[]{0, 0};
        return new int[]{maxQ.peek()[0], minQ.peek()[0]};
    }
}
