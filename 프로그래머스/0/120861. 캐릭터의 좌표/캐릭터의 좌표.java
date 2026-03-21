class Solution {
    public int[] solution(String[] keyinput, int[] board) {
        int[] pos = {0, 0};
        int maxX = (board[0] - 1) / 2;
        int maxY = (board[1] - 1) / 2;

        for (String k : keyinput) {
            if (k.equals("up") && pos[1] < maxY) {
                pos[1]++;
            } else if (k.equals("down") && pos[1] > -maxY) {
                pos[1]--;
            } else if (k.equals("right") && pos[0] < maxX) {
                pos[0]++;
            } else if (k.equals("left") && pos[0] > -maxX) {
                pos[0]--;
            }
        }

        return pos;
    }
}