import java.util.*;

class Solution {
    private int[][] robotInfo;
    private int[] walls;
    private int[][] memo;
    private int n;

    public int maxWalls(int[] robots, int[] distance, int[] walls) {
        this.n = robots.length;
        this.robotInfo = new int[n][2];
        for (int i = 0; i < n; i++) {
            robotInfo[i][0] = robots[i];
            robotInfo[i][1] = distance[i];
        }

        Arrays.sort(robotInfo, Comparator.comparingInt(a -> a[0]));
        this.walls = walls.clone();
        Arrays.sort(this.walls);

        memo = new int[n][2];
        for (int i = 0; i < n; i++) {
            Arrays.fill(memo[i], -1);
        }

        return dfs(n - 1, 1);
    }

    private int dfs(int i, int prevDir) {
        if (i < 0) return 0;
        if (memo[i][prevDir] != -1) return memo[i][prevDir];

        int pos = robotInfo[i][0];
        int dist = robotInfo[i][1];

        int leftL = pos - dist;
        if (i > 0) {
            leftL = Math.max(leftL, robotInfo[i - 1][0] + 1);
        }
        int leftCnt = countWalls(leftL, pos);

        int rightR = pos + dist;
        if (i + 1 < n) {
            if (prevDir == 0) {
                rightR = Math.min(rightR, robotInfo[i + 1][0] - robotInfo[i + 1][1] - 1);
            } else {
                rightR = Math.min(rightR, robotInfo[i + 1][0] - 1);
            }
        }
        int rightCnt = countWalls(pos, rightR);

        memo[i][prevDir] = Math.max(
            dfs(i - 1, 0) + leftCnt,
            dfs(i - 1, 1) + rightCnt
        );
        return memo[i][prevDir];
    }

    private int countWalls(int l, int r) {
        if (l > r) return 0;
        return lowerBound(walls, r + 1) - lowerBound(walls, l);
    }

    private int lowerBound(int[] arr, int target) {
        int l = 0, r = arr.length;
        while (l < r) {
            int m = l + (r - l) / 2;
            if (arr[m] < target) l = m + 1;
            else r = m;
        }
        return l;
    }
}