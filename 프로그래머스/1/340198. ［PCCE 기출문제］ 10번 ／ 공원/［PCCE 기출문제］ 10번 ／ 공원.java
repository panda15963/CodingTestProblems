import java.util.Arrays;

class Solution {
    public int solution(int[] mats, String[][] park) {
        int rows = park.length;
        int cols = park[0].length;

        // 큰 돗자리부터 넣어보기 위해 내림차순 정렬
        Arrays.sort(mats);

        for (int i = mats.length - 1; i >= 0; i--) {
            int matSize = mats[i];

            // 공원의 각 위치에서 돗자리 깔 수 있는지 확인
            for (int r = 0; r <= rows - matSize; r++) {
                for (int c = 0; c <= cols - matSize; c++) {
                    if (canPlace(r, c, matSize, park)) {
                        return matSize;  // 가장 큰 돗자리 반환
                    }
                }
            }
        }

        // 깔 돗자리가 없으면 -1 반환
        return -1;
    }

    // 돗자리를 깔 수 있는지 확인하는 메소드
    private boolean canPlace(int r, int c, int size, String[][] park) {
        for (int i = r; i < r + size; i++) {
            for (int j = c; j < c + size; j++) {
                if (!park[i][j].equals("-1")) {
                    return false;
                }
            }
        }
        return true;
    }
}