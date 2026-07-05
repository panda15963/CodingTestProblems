class Solution {

    // 2차원 배열 90도 회전
    private int[][] rotate(int[][] a) {
        int n = a.length;
        int m = a[0].length;

        int[][] result = new int[m][n];

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                result[j][n - i - 1] = a[i][j];
            }
        }

        return result;
    }

    // 자물쇠 중앙 부분이 모두 1인지 확인
    private boolean check(int[][] newLock) {

        int lockLength = newLock.length / 3;

        for (int i = lockLength; i < lockLength * 2; i++) {
            for (int j = lockLength; j < lockLength * 2; j++) {
                if (newLock[i][j] != 1) {
                    return false;
                }
            }
        }

        return true;
    }

    public boolean solution(int[][] key, int[][] lock) {

        int n = lock.length;
        int m = key.length;

        // 자물쇠를 3배 크기로 확장
        int[][] newLock = new int[n * 3][n * 3];

        // 가운데에 기존 자물쇠 배치
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                newLock[i + n][j + n] = lock[i][j];
            }
        }

        // 4방향 회전
        for (int rotation = 0; rotation < 4; rotation++) {

            key = rotate(key);

            for (int x = 0; x < n * 2; x++) {
                for (int y = 0; y < n * 2; y++) {

                    // 열쇠 삽입
                    for (int i = 0; i < m; i++) {
                        for (int j = 0; j < m; j++) {
                            newLock[x + i][y + j] += key[i][j];
                        }
                    }

                    // 확인
                    if (check(newLock)) {
                        return true;
                    }

                    // 원상복구
                    for (int i = 0; i < m; i++) {
                        for (int j = 0; j < m; j++) {
                            newLock[x + i][y + j] -= key[i][j];
                        }
                    }
                }
            }
        }

        return false;
    }
}