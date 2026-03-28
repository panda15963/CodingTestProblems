class Solution {
    public int solution(String name) {
        int answer = 0;
        int len = name.length();

        // 1. 위/아래 이동
        for (int i = 0; i < len; i++) {
            char c = name.charAt(i);
            answer += Math.min(c - 'A', 'Z' - c + 1);
        }

        // 2. 좌/우 이동
        int move = len - 1;

        for (int i = 0; i < len; i++) {
            int next = i + 1;

            while (next < len && name.charAt(next) == 'A') {
                next++;
            }

            move = Math.min(
                move,
                Math.min(
                    i * 2 + len - next,
                    i + 2 * (len - next)
                )
            );
        }

        return answer + move;
    }
}