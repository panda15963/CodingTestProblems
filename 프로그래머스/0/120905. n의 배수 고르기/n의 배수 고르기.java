class Solution {
    public int[] solution(int n, int[] numlist) {
        // 1. n의 배수 개수 먼저 센다
        int count = 0;
        for (int x : numlist) {
            if (x % n == 0) {
                count++;
            }
        }

        // 2. 그만큼의 크기의 배열 생성
        int[] answer = new int[count];
        int idx = 0;
        for (int x : numlist) {
            if (x % n == 0) {
                answer[idx++] = x;
            }
        }

        return answer;
    }
}
