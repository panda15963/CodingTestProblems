class Solution {
    public int solution(int n) {
        int answer = 0;

        while (n != 0) {
            int a = n / 2;
            int b = n % 2;
            n = a;

            if (b == 1) {
                answer++;
            }
        }

        return answer;
    }
}