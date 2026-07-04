class Solution {

    static int[][] map;

    static void dfs(int x, int y, int size, int[] answer) {

        boolean zero = true;
        boolean one = true;

        for (int i = x; i < x + size; i++) {
            for (int j = y; j < y + size; j++) {
                if (map[i][j] == 0) one = false;
                if (map[i][j] == 1) zero = false;
            }
        }

        if (zero) {
            answer[0]++;
            return;
        }

        if (one) {
            answer[1]++;
            return;
        }

        int half = size / 2;

        dfs(x, y, half, answer);
        dfs(x, y + half, half, answer);
        dfs(x + half, y, half, answer);
        dfs(x + half, y + half, half, answer);
    }

    public int[] solution(int[][] arr) {

        map = arr;

        int[] answer = new int[2];

        dfs(0, 0, arr.length, answer);

        return answer;
    }
}