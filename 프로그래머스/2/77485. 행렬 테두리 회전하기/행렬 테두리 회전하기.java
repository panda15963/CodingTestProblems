import java.util.*;

class Solution {
    public int[] solution(int rows, int columns, int[][] queries) {

        int[][] matrix = new int[rows][columns];
        int value = 1;

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < columns; j++) {
                matrix[i][j] = value++;
            }
        }

        int[] answer = new int[queries.length];

        for (int q = 0; q < queries.length; q++) {

            int a1 = queries[q][0] - 1;
            int a2 = queries[q][1] - 1;
            int b1 = queries[q][2] - 1;
            int b2 = queries[q][3] - 1;

            List<Integer> result = new ArrayList<>();

            int n1 = matrix[a1][b2];
            int n3 = matrix[b1][b2];
            int n4 = matrix[b1][a2];

            // 위쪽
            for (int i = b2; i > a2; i--) {
                matrix[a1][i] = matrix[a1][i - 1];
                result.add(matrix[a1][i]);
            }

            // 오른쪽
            for (int i = b1; i > a1; i--) {
                if (i == a1 + 1)
                    matrix[i][b2] = n1;
                else
                    matrix[i][b2] = matrix[i - 1][b2];

                result.add(matrix[i][b2]);
            }

            // 아래쪽
            for (int i = a2; i < b2; i++) {
                if (i == b2 - 1)
                    matrix[b1][i] = n3;
                else
                    matrix[b1][i] = matrix[b1][i + 1];

                result.add(matrix[b1][i]);
            }

            // 왼쪽
            for (int i = a1; i < b1; i++) {
                if (i == b1 - 1)
                    matrix[i][a2] = n4;
                else
                    matrix[i][a2] = matrix[i + 1][a2];

                result.add(matrix[i][a2]);
            }

            answer[q] = Collections.min(result);
        }

        return answer;
    }
}