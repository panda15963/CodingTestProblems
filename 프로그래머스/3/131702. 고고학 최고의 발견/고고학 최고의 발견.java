class Solution {
    static int minRotation = Integer.MAX_VALUE;
    static int[] dr = {-1, 1, 0, 0, 0};
    static int[] dc = {0, 0, -1, 1, 0};

    public int solution(int[][] clockHands) {
        int n = clockHands.length;
        
        // 첫 번째 행의 시계들을 회전시키는 모든 경우의 수를 탐색 (4^n)
        dfs(0, new int[n], clockHands, n);
        
        return minRotation;
    }

    private void dfs(int row, int[] rotations, int[][] clockHands, int n) {
        if (row == n) {
            // 현재 첫 번째 행의 설정으로 나머지 판을 완성해보고 최소 횟수 갱신
            int count = calculateRotations(rotations, clockHands, n);
            minRotation = Math.min(minRotation, count);
            return;
        }

        // 각 칸은 0번~3번 회전(90도씩) 가능
        for (int i = 0; i < 4; i++) {
            rotations[row] = i;
            dfs(row + 1, rotations, clockHands, n);
        }
    }

    private int calculateRotations(int[] firstRowRotations, int[][] originalHands, int n) {
        // 원본 배열을 수정하지 않기 위해 복사본 사용
        int[][] hands = new int[n][n];
        for (int i = 0; i < n; i++) {
            hands[i] = originalHands[i].clone();
        }

        int totalRotations = 0;

        // 1. 첫 번째 행의 회전 적용
        for (int c = 0; c < n; c++) {
            totalRotations += firstRowRotations[c];
            rotate(hands, 0, c, firstRowRotations[c], n);
        }

        // 2. 두 번째 행부터는 바로 윗 칸이 12시(0)가 되도록 강제로 회전 횟수 결정
        for (int r = 1; r < n; r++) {
            for (int c = 0; c < n; c++) {
                int currentVal = hands[r - 1][c];
                // 윗 칸을 12시(0)로 만들기 위해 필요한 회전 수
                int neededRotations = (4 - currentVal) % 4; 
                
                totalRotations += neededRotations;
                rotate(hands, r, c, neededRotations, n);
            }
        }

        // 3. 마지막 행의 시계들이 모두 12시(0)가 되었는지 확인
        for (int c = 0; c < n; c++) {
            if (hands[n - 1][c] != 0) {
                return Integer.MAX_VALUE; // 조건 미달성 시 무효값 반환
            }
        }

        return totalRotations;
    }

    private void rotate(int[][] hands, int r, int c, int count, int n) {
        for (int i = 0; i < 5; i++) {
            int nr = r + dr[i];
            int nc = c + dc[i];

            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                hands[nr][nc] = (hands[nr][nc] + count) % 4;
            }
        }
    }
}
