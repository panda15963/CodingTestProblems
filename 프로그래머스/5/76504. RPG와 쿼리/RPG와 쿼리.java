import java.util.*;

class Solution {

    static final long INF = Long.MAX_VALUE;

    static int N;
    static ArrayList<int[]>[] graph;

    // money 범위가 0 ~ limit, city 범위가 0 ~ (N - 1)
    // 인덱스를 money * N + city 형태로 변환
    static int getIdx(int money, int city) {
        return money * N + city;
    }

    public long[] solution(int n, int z, int[][] roads, long[] queries) {

        N = n;
        graph = new ArrayList[n];

        for (int i = 0; i < n; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int[] rd : roads) {
            int u = rd[0];
            int v = rd[1];
            int w = rd[2];
            graph[u].add(new int[]{v, w});
        }

        int limit = z * z + z;

        // dist[(money, city)] = 해당 상태까지의 최소 턴 수
        int[] dist = new int[(limit + 1) * n];
        Arrays.fill(dist, -1);

        // visitedTeleport[m] = money=m 상태에서
        // 현재 BFS level에서 순간이동을 처리했는지 여부
        int[] visitedTeleport = new int[limit + 1];
        Arrays.fill(visitedTeleport, -1);

        Queue<int[]> queue = new ArrayDeque<>();

        dist[getIdx(0, 0)] = 0;
        queue.offer(new int[]{0, 0});

        while (!queue.isEmpty()) {

            int[] cur = queue.poll();

            int curMoney = cur[0];
            int curCity = cur[1];

            int curDist = dist[getIdx(curMoney, curCity)];

            // 1. 가만히 있기
            int nextMoney = curMoney + z;

            if (nextMoney <= limit) {

                int idx = getIdx(nextMoney, curCity);

                if (dist[idx] == -1) {
                    dist[idx] = curDist + 1;
                    queue.offer(new int[]{nextMoney, curCity});
                }
            }

            // 2. 도로 이동
            for (int[] edge : graph[curCity]) {

                int nextCity = edge[0];
                int cost = edge[1];

                nextMoney = curMoney + cost;

                if (nextMoney <= limit) {

                    int idx = getIdx(nextMoney, nextCity);

                    if (dist[idx] == -1) {
                        dist[idx] = curDist + 1;
                        queue.offer(new int[]{nextMoney, nextCity});
                    }
                }
            }

            // 3. 순간이동
            if (visitedTeleport[curMoney] != curDist) {

                visitedTeleport[curMoney] = curDist;

                for (int city = 0; city < n; city++) {

                    if (city == curCity) {
                        continue;
                    }

                    int idx = getIdx(curMoney, city);

                    if (dist[idx] == -1) {
                        dist[idx] = curDist + 1;
                        queue.offer(new int[]{curMoney, city});
                    }
                }
            }
        }

        // dp[x] = 정확히 x원을 만드는 최소 턴 수
        long[] dp = new long[limit + 1];
        Arrays.fill(dp, INF);

        for (int money = 0; money <= limit; money++) {

            long best = INF;

            for (int city = 0; city < n; city++) {

                int d = dist[getIdx(money, city)];

                if (d >= 0) {
                    best = Math.min(best, d);
                }
            }

            if (best != INF) {
                dp[money] = best;
            }
        }

        long[] answer = new long[queries.length];

        for (int i = 0; i < queries.length; i++) {

            long target = queries[i];

            if (target == 0) {
                answer[i] = 0;
                continue;
            }

            long bestAns = -1;

            long K = target / z;
            long lowK = Math.max(0L, K - z - 2);

            for (long k = K; k >= lowK; k--) {

                long leftover = target - k * z;

                if (leftover < 0) {
                    break;
                }

                if (leftover > limit) {
                    continue;
                }

                if (dp[(int) leftover] == INF) {
                    continue;
                }

                long candidate = k + dp[(int) leftover];

                if (bestAns == -1 || candidate < bestAns) {
                    bestAns = candidate;
                }
            }

            answer[i] = bestAns;
        }

        return answer;
    }
}