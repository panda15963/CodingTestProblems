class Solution {
    public int countCommas(int n) {
        int answer = 0;

        for (long threshold = 1000; threshold <= n; threshold *= 1000) {
            answer += n - threshold + 1;
        }

        return answer;
    }
}