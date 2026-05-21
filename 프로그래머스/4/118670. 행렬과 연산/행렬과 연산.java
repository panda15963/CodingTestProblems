import java.util.*;

class Solution {
    public int[][] solution(int[][] rc, String[] operations) {
        int r = rc.length;
        int c = rc[0].length;
        
        Deque<Integer> leftCol = new ArrayDeque<>();
        Deque<Integer> rightCol = new ArrayDeque<>();
        Deque<Deque<Integer>> rows = new ArrayDeque<>();
        
        // 초기 행렬 상태를 Deque들로 분리하여 저장
        for (int i = 0; i < r; i++) {
            leftCol.addLast(rc[i][0]);
            rightCol.addLast(rc[i][c - 1]);
            
            Deque<Integer> row = new ArrayDeque<>();
            for (int j = 1; j < c - 1; j++) {
                row.addLast(rc[i][j]);
            }
            rows.addLast(row);
        }
        
        // 연산 수행
        for (String op : operations) {
            if (op.equals("ShiftRow")) {
                leftCol.addFirst(leftCol.pollLast());
                rightCol.addFirst(rightCol.pollLast());
                rows.addFirst(rows.pollLast());
            } else if (op.equals("Rotate")) {
                // 1. 좌측 열 위에서 내부 첫 번째 행으로 이동
                rows.peekFirst().addFirst(leftCol.pollFirst());
                // 2. 내부 첫 번째 행 마지막 원소에서 우측 열 위로 이동
                rightCol.addFirst(rows.peekFirst().pollLast());
                // 3. 우측 열 아래에서 내부 마지막 행으로 이동
                rows.peekLast().addLast(rightCol.pollLast());
                // 4. 내부 마지막 행 첫 번째 원소에서 좌측 열 아래로 이동
                leftCol.addLast(rows.peekLast().pollFirst());
            }
        }
        
        // 결과를 2차원 배열 형태로 복원
        int[][] answer = new int[r][c];
        for (int i = 0; i < r; i++) {
            answer[i][0] = leftCol.pollFirst();
            Deque<Integer> row = rows.pollFirst();
            for (int j = 1; j < c - 1; j++) {
                answer[i][j] = row.pollFirst();
            }
            answer[i][c - 1] = rightCol.pollFirst();
        }
        
        return answer;
    }
}
