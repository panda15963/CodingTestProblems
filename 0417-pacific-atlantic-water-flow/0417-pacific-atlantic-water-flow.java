public class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < heights.length; i++) {
            for (int j = 0; j < heights[0].length; j++) {
                System.out.printf("\n\ninit Flow : %d, %d\n", i, j);
                Flow flow = new Flow();
                dfs(flow, heights, Integer.MAX_VALUE, i, j);
                if (flow.flowToAtlanticOcean && flow.flowToPacificOcean) {
                    result.add(List.of(i, j));
                }
            }
        }

        return result;
    }

    private void dfs(Flow flow, int[][] heights, int prev, int i, int j) {
        if (i == -1 || j == -1) {
            flow.flowToPacificOcean = true;
            return;
        }

        if (i == heights.length || j == heights[0].length) {
            flow.flowToAtlanticOcean = true;
            return;
        }

        if (heights[i][j] == -1 || heights[i][j] > prev || flow.flowToAtlanticOcean && flow.flowToPacificOcean) {
            return;
        }

        int currentHeight = heights[i][j];
        heights[i][j] = -1;

        dfs(flow, heights, currentHeight, i + 1, j);
        dfs(flow, heights, currentHeight, i - 1, j);
        dfs(flow, heights, currentHeight, i, j + 1);
        dfs(flow, heights, currentHeight, i, j - 1);

        heights[i][j] = currentHeight;
    }
}

class Flow {
    boolean flowToPacificOcean;
    boolean flowToAtlanticOcean;
}