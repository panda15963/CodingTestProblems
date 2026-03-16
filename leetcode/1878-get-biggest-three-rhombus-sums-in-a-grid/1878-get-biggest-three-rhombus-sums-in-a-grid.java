import java.util.*;

class Solution {
    public int[] getBiggestThree(int[][] grid) {

        int m = grid.length;
        int n = grid[0].length;

        Set<Integer> set = new HashSet<>();

        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {

                // size = 0 rhombus
                set.add(grid[r][c]);

                for (int k = 1; ; k++) {

                    if (r - k < 0 || r + k >= m || c - k < 0 || c + k >= n)
                        break;

                    int sum = 0;

                    // top → right
                    for (int i = 0; i < k; i++) {
                        sum += grid[r - k + i][c + i];
                    }

                    // right → bottom
                    for (int i = 0; i < k; i++) {
                        sum += grid[r + i][c + k - i];
                    }

                    // bottom → left
                    for (int i = 0; i < k; i++) {
                        sum += grid[r + k - i][c - i];
                    }

                    // left → top
                    for (int i = 0; i < k; i++) {
                        sum += grid[r - i][c - k + i];
                    }

                    set.add(sum);
                }
            }
        }

        List<Integer> list = new ArrayList<>(set);
        list.sort(Collections.reverseOrder());

        int size = Math.min(3, list.size());
        int[] result = new int[size];

        for (int i = 0; i < size; i++) {
            result[i] = list.get(i);
        }

        return result;
    }
}