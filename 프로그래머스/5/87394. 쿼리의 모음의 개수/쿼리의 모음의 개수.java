import java.util.*;

public class Solution {
    private static final int MOD = 998244353;
    private static final int N = 55;
    private static final int M = 100005;

    private static int[] a = new int[N];
    private static int[] vis = new int[M];
    private static int[] to = new int[M];
    private static int[] ttl = new int[M];
    private static int[][] ncr = new int[N][N];
    private static int[][][] tmp = new int[N][N][N];
    private static int[][] dp = new int[N][N];
    private static int[][] pw = new int[N][N];
    private static int[] res = new int[N];
    private static int[] tmp2 = new int[N];
    private static int[] b = new int[N];
    private static int[] p = new int[N];
    private static int[] px = new int[N];

    private static int mypow(int x, int b) {
        if (b == 0) return 1;
        int t = mypow(x, b / 2);
        if (b % 2 == 0) {
            return (int) ((long) t * t % MOD);
        } else {
            return (int) ((long) t * t % MOD * x % MOD);
        }
    }

    private static void Do2(int x, int m) {
        int cnt = 0;
        for (int i = 1; i <= m; i++) {
            if (b[i] != 0) {
                cnt++;
                p[cnt] = i;
                px[i] = cnt;
            }
        }
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= q; j++) {
                for (int k = 0; k <= cnt; k++) {
                    tmp[i][j][k] = 0;
                }
            }
        }
        for (int i = 0; i <= q; i++) {
            tmp[0][i][0] = dp[to[x]][i];
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j <= q; j++) {
                for (int k = 0; k <= cnt; k++) {
                    if (k == 0 || p[k] <= i) {
                        if (k == 0 && b[i + 1] != 0) {
                            tmp[i + 1][j][px[i + 1]] = (tmp[i + 1][j][px[i + 1]] + tmp[i][j][k]) % MOD;
                        } else {
                            tmp[i + 1][j][k] = (tmp[i + 1][j][k] + tmp[i][j][k]) % MOD;
                        }
                        if (k == 0) {
                            for (int t = 1; t <= q - j; t++) {
                                tmp[i + 1][j + t][k] = (int) ((tmp[i + 1][j + t][k] + (long) tmp[i][j][k] * pw[i + 1][t] % MOD * ncr[j + t][t]) % MOD);
                            }
                            continue;
                        }
                        for (int t = 1; t <= q - j; t++) {
                            tmp[i + 1][j + t][k] = (int) ((tmp[i + 1][j + t][k] + (long) tmp[i][j][k] * pw[i - p[k] + 1][t] % MOD * ncr[j + t][t]) % MOD);
                            tmp[i + 1][j + t][0] = (int) ((tmp[i + 1][j + t][0] + (long) tmp[i][j][k] * (pw[i + 1][t] + MOD - pw[i - p[k] + 1][t]) % MOD * ncr[j + t][t]) % MOD);
                        }
                    }
                }
            }
        }
        for (int i = 0; i <= q; i++) {
            dp[to[x]][i] = tmp[m][i][0];
        }
    }

    private static void Do(int x) {
        dp[to[x]][0] = 1;
        int l = 1;
        while (l <= n) {
            if (x <= a[l]) {
                int r = l;
                while (r + 1 <= n && x <= a[r + 1]) {
                    r++;
                }
                for (int i = l; i <= r; i++) {
                    b[i - l + 1] = (x == a[i]) ? 1 : 0;
                }
                Do2(x, r - l + 1);
                l = r;
            }
            l++;
        }
    }

    private static int q, n;

    public static int solution(int qq, int[] arr) {
        q = qq;
        n = arr.length;
        a = new int[n + 1];
        System.arraycopy(arr, 0, a, 1, n);

        for (int i = 1; i <= n; i++) {
            vis[a[i]] = 1;
        }
        ncr[0][0] = 1;
        for (int i = 1; i < N; i++) {
            ncr[i][0] = ncr[i][i] = 1;
            for (int j = 1; j < i; j++) {
                ncr[i][j] = (ncr[i - 1][j - 1] + ncr[i - 1][j]) % MOD;
            }
        }
        for (int i = 0; i < N; i++) {
            pw[i][0] = 1;
            for (int j = 1; j < N; j++) {
                pw[i][j] = (int) ((long) pw[i][j - 1] * i % MOD);
            }
        }
        int m = 1;
        for (int i = 1; i < M; i++) {
            if (vis[i] == 1) {
                to[i] = m;
                m++;
            }
        }
        res[0] = 1;
        for (int i = M - 1; i > 0; i--) {
            if (vis[i] == 1) {
                Do(i);
                Arrays.fill(tmp2, 0);
                for (int j = 0; j <= q; j++) {
                    for (int k = 0; k <= q - j; k++) {
                        tmp2[j + k] = (int) ((tmp2[j + k] + (long) res[j] * dp[to[i]][k] % MOD * ncr[j + k][k]) % MOD);
                    }
                }
                System.arraycopy(tmp2, 0, res, 0, q + 1);
            }
        }
        for (int l = 1; l <= n; l++) {
            int mn = Integer.MAX_VALUE;
            for (int r = l; r <= n; r++) {
                mn = Math.min(mn, a[r]);
                ttl[1]++;
                ttl[mn]--;
            }
        }
        int nuse = 0;
        for (int i = 1; i < M; i++) {
            ttl[i] += ttl[i - 1];
            if (vis[i] == 0) {
                nuse = (nuse + ttl[i]) % MOD;
            }
        }
        Arrays.fill(tmp2, 0);
        for (int j = 0; j <= q; j++) {
            for (int k = 0; k <= q - j; k++) {
                tmp2[j + k] = (int) ((tmp2[j + k] + (long) res[j] * mypow(nuse, k) % MOD * ncr[j + k][k]) % MOD);
            }
        }
        System.arraycopy(tmp2, 0, res, 0, q + 1);
        return res[q];
    }

    public static void main(String[] args) {
        int q1 = 2;
        int[] a1 = {1, 2};
        System.out.println(solution(q1, a1)); // Output: 4

        int q2 = 3;
        int[] a2 = {3};
        System.out.println(solution(q2, a2)); // Output: 19

        int q3 = 5;
        int[] a3 = {1, 4, 4};
        System.out.println(solution(q3, a3)); // Output: 157740

        int q4 = 50;
        int[] a4 = {1, 6, 5, 2, 4};
        System.out.println(solution(q4, a4)); // Output: 61953538
    }
}