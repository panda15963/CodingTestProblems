import java.util.*;

class Solution {
    private boolean[] isPrime;

    private void buildSieve(int maxEl) {
        isPrime = new boolean[maxEl + 1];
        Arrays.fill(isPrime, true);

        if (maxEl >= 0) isPrime[0] = false;
        if (maxEl >= 1) isPrime[1] = false;

        for (int num = 2; num * num <= maxEl; num++) {
            if (isPrime[num]) {
                for (int multiple = num * num; multiple <= maxEl; multiple += num) {
                    isPrime[multiple] = false;
                }
            }
        }
    }

    public int minJumps(int[] nums) {
        int n = nums.length;

        Map<Integer, List<Integer>> mp = new HashMap<>(); // element -> indices
        int maxEl = 0;
        for (int i = 0; i < n; i++) {
            mp.computeIfAbsent(nums[i], k -> new ArrayList<>()).add(i);
            maxEl = Math.max(maxEl, nums[i]);
        }

        buildSieve(maxEl);

        Queue<Integer> que = new ArrayDeque<>();
        boolean[] visited = new boolean[n];
        que.offer(0);
        visited[0] = true;

        Set<Integer> seen = new HashSet<>();
        int steps = 0;

        while (!que.isEmpty()) {
            int size = que.size();

            while (size-- > 0) {
                int i = que.poll();

                if (i == n - 1) {
                    return steps;
                }

                if (i - 1 >= 0 && !visited[i - 1]) {
                    visited[i - 1] = true;
                    que.offer(i - 1);
                }

                if (i + 1 <= n - 1 && !visited[i + 1]) {
                    visited[i + 1] = true;
                    que.offer(i + 1);
                }

                if (!isPrime[nums[i]] || seen.contains(nums[i])) {
                    continue;
                }

                for (int multiple = nums[i]; multiple <= maxEl; multiple += nums[i]) {
                    List<Integer> list = mp.get(multiple);
                    if (list == null) continue;

                    for (int j : list) {
                        if (!visited[j]) {
                            visited[j] = true;
                            que.offer(j);
                        }
                    }
                }

                seen.add(nums[i]);
            }

            steps++;
        }

        return steps;
    }
}