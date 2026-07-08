import java.util.Arrays;

class Solution {
    public int solution(int n) {
        boolean[] isPrime = new boolean[n + 1];
        Arrays.fill(isPrime, true);

        for (int i = 2; i <= Math.sqrt(n); i++) {
            if (isPrime[i]) {
                int j = 2;

                while (i * j <= n) {
                    isPrime[i * j] = false;
                    j++;
                }
            }
        }

        int answer = 0;

        for (int i = 2; i <= n; i++) {
            if (isPrime[i]) {
                answer++;
            }
        }

        return answer;
    }
}