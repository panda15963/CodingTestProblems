class Solution {
    public int solution(int[][] lines) {
        int[] count = new int[201]; // -100 ~ 100 → +100 shift

        // 선분 표시
        for (int[] line : lines) {
            int start = line[0] + 100;
            int end = line[1] + 100;

            for (int i = start; i < end; i++) {
                count[i]++;
            }
        }

        // 겹친 길이 계산
        int answer = 0;
        for (int i = 0; i < 200; i++) {
            if (count[i] >= 2) {
                answer++;
            }
        }

        return answer;
    }
}