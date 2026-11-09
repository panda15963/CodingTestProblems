class Solution {
    public int leastBricks(List<List<Integer>> wall) {
        Map<Long, Integer> edgeCount = new HashMap<>();

        for (List<Integer> row : wall) {
            long position = 0;

            // 마지막 벽돌은 제외
            for (int i = 0; i < row.size() - 1; i++) {
                position += row.get(i);

                edgeCount.merge(position, 1, Integer::sum);
            }
        }

        int maxEdges = 0;

        for (int count : edgeCount.values()) {
            maxEdges = Math.max(maxEdges, count);
        }

        return wall.size() - maxEdges;
    }
}