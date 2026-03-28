import java.util.*;

class Solution {
    public int solution(int N, int number) {
        final int MAX = 8;
        Set<Integer>[] dp = new Set[9];

        for (int i = 0; i < 9; i++) {
            dp[i] = new HashSet<>();
        }

        // 1번 사용: N, 2번: NN, 3번: NNN, ...
        int nn = N;
        for (int i = 1; i <= MAX; i++) {
            dp[i].add(nn);
            nn = nn * 10 + N;
        }

        // 1~8번 사용해서 만들 수 있는 모든 수 계산
        for (int i = 1; i <= MAX; i++) {
            for (int j = 1; j < i; j++) {
                for (int a : dp[j]) {
                    for (int b : dp[i - j]) {
                        dp[i].add(a + b);
                        dp[i].add(a - b);
                        dp[i].add(b - a);
                        dp[i].add(a * b);
                        if (b != 0) dp[i].add(a / b);
                        if (a != 0) dp[i].add(b / a);
                    }
                }
            }

            if (dp[i].contains(number)) {
                return i;
            }
        }

        return -1;
    }
}