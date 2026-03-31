import java.util.*;

class Solution {

    private Map<Long, Integer> coordToIdx = new HashMap<>();
    private List<int[]> pointCoords = new ArrayList<>();  
    private List<boolean[]> pointCamera = new ArrayList<>();
    private List<int[]> pointLimit = new ArrayList<>();
    private List<List<Integer>> roadPoints = new ArrayList<>(); 

    private long coordKey(int x, int y) {
        return ((long) x + 1_000_000_001L) * 3_000_000_000L + (y + 1_000_000_001L);
    }

    private int getOrCreate(int x, int y) {
        long key = coordKey(x, y);
        if (coordToIdx.containsKey(key)) {
            return coordToIdx.get(key);
        }
        int idx = pointCoords.size();
        coordToIdx.put(key, idx);
        pointCoords.add(new int[]{x, y});
        pointCamera.add(new boolean[]{false});
        pointLimit.add(new int[]{Integer.MAX_VALUE});
        return idx;
    }

    private void registerToRoad(int pointIdx, int roadIdx) {
        roadPoints.get(roadIdx).add(pointIdx);
    }

    private int[] getIntersectionHV(int[] r1, boolean isH1, int[] r2, boolean isH2) {
        if (isH1 == isH2) return null;
        int[] h = isH1 ? r1 : r2;
        int[] v = isH1 ? r2 : r1;
        int x = v[0], y = h[1];
        if (Math.min(h[0], h[2]) <= x && x <= Math.max(h[0], h[2]) &&
                Math.min(v[1], v[3]) <= y && y <= Math.max(v[1], v[3])) {
            return new int[]{x, y};
        }
        return null;
    }

    private int[] getIntersectionSameDir(int[] r1, boolean isH1, int[] r2, boolean isH2) {
        if (isH1 != isH2) return null;
        if (isH1) {
            if (r1[1] != r2[1]) return null;
            int max1 = Math.max(r1[0], r1[2]), min1 = Math.min(r1[0], r1[2]);
            int max2 = Math.max(r2[0], r2[2]), min2 = Math.min(r2[0], r2[2]);
            if (max1 == min2) return new int[]{max1, r1[1]};
            if (max2 == min1) return new int[]{max2, r1[1]};
        } else {
            if (r1[0] != r2[0]) return null;
            int max1 = Math.max(r1[1], r1[3]), min1 = Math.min(r1[1], r1[3]);
            int max2 = Math.max(r2[1], r2[3]), min2 = Math.min(r2[1], r2[3]);
            if (max1 == min2) return new int[]{r1[0], max1};
            if (max2 == min1) return new int[]{r1[0], max2};
        }
        return null;
    }

    public int[] solution(int[][] city, int[][] road) {
        int m = road.length;
        boolean[] isH = new boolean[m];
        int[][] cameras = new int[m][2];

        for (int i = 0; i < m; i++) {
            isH[i] = (road[i][1] == road[i][3]);
            cameras[i][0] = (road[i][0] + road[i][2]) / 2;
            cameras[i][1] = (road[i][1] + road[i][3]) / 2;
            roadPoints.add(new ArrayList<>());
        }

        for (int i = 0; i < m; i++) {
            for (int j = i + 1; j < m; j++) {
                int[] inter = getIntersectionHV(road[i], isH[i], road[j], isH[j]);
                if (inter != null) {
                    int idx = getOrCreate(inter[0], inter[1]);
                    registerToRoad(idx, i);
                    registerToRoad(idx, j);
                }
                int[] inter2 = getIntersectionSameDir(road[i], isH[i], road[j], isH[j]);
                if (inter2 != null) {
                    int idx = getOrCreate(inter2[0], inter2[1]);
                    registerToRoad(idx, i);
                    registerToRoad(idx, j);
                }
            }
        }

        int[] cityIndices = new int[city.length];
        for (int ci = 0; ci < city.length; ci++) {
            int cx = city[ci][0], cy = city[ci][1];
            int idx = getOrCreate(cx, cy);
            cityIndices[ci] = idx;
            for (int ri = 0; ri < m; ri++) {
                if (isH[ri]) {
                    if (cy == road[ri][1] &&
                            Math.min(road[ri][0], road[ri][2]) <= cx &&
                            cx <= Math.max(road[ri][0], road[ri][2])) {
                        registerToRoad(idx, ri);
                    }
                } else {
                    if (cx == road[ri][0] &&
                            Math.min(road[ri][1], road[ri][3]) <= cy &&
                            cy <= Math.max(road[ri][1], road[ri][3])) {
                        registerToRoad(idx, ri);
                    }
                }
            }
        }

        for (int ri = 0; ri < m; ri++) {
            int idx = getOrCreate(cameras[ri][0], cameras[ri][1]);
            pointCamera.get(idx)[0] = true;
            pointLimit.get(idx)[0] = Math.min(pointLimit.get(idx)[0], road[ri][4]);
            registerToRoad(idx, ri);
        }

        int n = pointCoords.size();
        List<Set<Integer>> G = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            G.add(new HashSet<>());
        }

        for (int ri = 0; ri < m; ri++) {
            List<Integer> pts = new ArrayList<>(new HashSet<>(roadPoints.get(ri)));

            if (isH[ri]) {
                pts.sort((a, b) -> pointCoords.get(a)[0] - pointCoords.get(b)[0]);
            } else {
                pts.sort((a, b) -> pointCoords.get(a)[1] - pointCoords.get(b)[1]);
            }

            for (int k = 0; k < pts.size() - 1; k++) {
                int a = pts.get(k), b = pts.get(k + 1);
                G.get(a).add(b);
                G.get(b).add(a);
            }
        }

        int[] dist = new int[n];
        boolean[] visited = new boolean[n];
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);

        int start = cityIndices[0];
        dist[start] = Integer.MAX_VALUE;
        pq.offer(new int[]{-Integer.MAX_VALUE, start});

        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int speed = -top[0];
            int u = top[1];

            if (visited[u]) continue;
            visited[u] = true;
            dist[u] = speed;

            for (int v : G.get(u)) {
                if (visited[v]) continue;
                int newSpeed = speed;
                if (pointCamera.get(v)[0]) {
                    newSpeed = Math.min(speed, pointLimit.get(v)[0]);
                }
                if (newSpeed > dist[v]) {
                    dist[v] = newSpeed;
                    pq.offer(new int[]{-newSpeed, v});
                }
            }
        }

        int[] answer = new int[city.length - 1];
        for (int i = 1; i < city.length; i++) {
            int d = dist[cityIndices[i]];
            answer[i - 1] = d >= 1_000_000 ? 0 : d;
        }

        return answer;
    }
}