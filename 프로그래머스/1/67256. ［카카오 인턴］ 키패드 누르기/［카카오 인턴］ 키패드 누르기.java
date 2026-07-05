class Solution {

    static int[][] pos = {
            {3, 1}, // 0
            {0, 0}, // 1
            {0, 1}, // 2
            {0, 2}, // 3
            {1, 0}, // 4
            {1, 1}, // 5
            {1, 2}, // 6
            {2, 0}, // 7
            {2, 1}, // 8
            {2, 2}, // 9
            {3, 0}, // *
            {3, 2}  // #
    };

    public String solution(int[] numbers, String hand) {

        StringBuilder answer = new StringBuilder();

        int left = 10;   // *
        int right = 11;  // #

        for (int n : numbers) {

            if (n == 1 || n == 4 || n == 7) {
                answer.append('L');
                left = n;
            } else if (n == 3 || n == 6 || n == 9) {
                answer.append('R');
                right = n;
            } else {

                int leftDistance =
                        Math.abs(pos[n][0] - pos[left][0]) +
                        Math.abs(pos[n][1] - pos[left][1]);

                int rightDistance =
                        Math.abs(pos[n][0] - pos[right][0]) +
                        Math.abs(pos[n][1] - pos[right][1]);

                if (leftDistance == rightDistance) {
                    if (hand.equals("left")) {
                        answer.append('L');
                        left = n;
                    } else {
                        answer.append('R');
                        right = n;
                    }
                } else if (leftDistance < rightDistance) {
                    answer.append('L');
                    left = n;
                } else {
                    answer.append('R');
                    right = n;
                }
            }
        }

        return answer.toString();
    }
}