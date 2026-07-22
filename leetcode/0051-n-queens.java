class Solution {
    List<List<String>> ret;
    public List<List<String>> solveNQueens(int n) {
        ret = new ArrayList<>();
        List<List<Integer>> queens = new ArrayList<>();
        recall(n, queens, 0);

        return ret;
    }

    private void recall(int n, List<List<Integer>> queens, int row) {
        // 1. 기저 조건: 모든 행에 퀸을 다 배치했을 때
        if (row >= n && queens.size() == n) {
            List<String> sl = getStrings(n, queens);
            ret.add(sl);
            return;
        }
        
        // 2. 현재 행(row)에서 각 열(col)에 퀸을 놓아보기
        for (int col = 0; col < n; col++) {
            if (isPosable(queens, row, col)) {
                queens.add(List.of(row, col)); // 퀸 배치
                recall(n, queens, row + 1);    // 다음 행으로 이동
                queens.removeLast();           // 백트래킹 (원태 복귀)
            }
        }
    }

    // 퀸의 위치 리스트를 문제에서 요구하는 문자열 리스트 포맷으로 변환
    private static List<String> getStrings(int n, List<List<Integer>> queens) {
        List<String> sl = new ArrayList<>();
        for (int row = 0; row < queens.size(); row++) {
            List<Integer> queen = queens.get(row);
            StringBuilder sb = new StringBuilder();
            for (int col = 0; col < n; col++) {
                if (queen.get(0) == row && queen.get(1) == col) {
                    sb.append('Q');
                } else {
                    sb.append('.');
                }
            }
            sl.add(sb.toString());
        }
        return sl;
    }

    // 현재 위치 (row, col)에 퀸을 놓을 수 있는지 체크
    private boolean isPosable(List<List<Integer>> queens, int row, int col) {
        for (List<Integer> queen : queens) {
            if (queen.get(1) == col || // 같은 열 체크
                    queen.get(0) + queen.get(1) == row + col || // 대각선 / 체크
                    queen.get(0) - queen.get(1) == row - col)   // 대각선 \ 체크
                return false;
        }
        return true;
    }
}