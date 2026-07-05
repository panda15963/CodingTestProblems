import java.util.*;

class Solution {

    int row, col;
    List<Set<Integer>> candidateKeys = new ArrayList<>();

    public int solution(String[][] relation) {

        row = relation.length;
        col = relation[0].length;

        for (int size = 1; size <= col; size++) {
            combination(0, 0, size, new ArrayList<>(), relation);
        }

        return candidateKeys.size();
    }

    private void combination(int start, int depth, int target,
                             List<Integer> comb, String[][] relation) {

        if (depth == target) {

            // 유일성 검사
            Set<String> set = new HashSet<>();

            for (int i = 0; i < row; i++) {
                StringBuilder sb = new StringBuilder();

                for (int idx : comb) {
                    sb.append(relation[i][idx]).append(" ");
                }

                set.add(sb.toString());
            }

            if (set.size() != row) {
                return;
            }

            // 최소성 검사
            Set<Integer> cur = new HashSet<>(comb);

            for (Set<Integer> key : candidateKeys) {
                if (cur.containsAll(key)) {
                    return;
                }
            }

            candidateKeys.add(cur);
            return;
        }

        for (int i = start; i < col; i++) {
            comb.add(i);
            combination(i + 1, depth + 1, target, comb, relation);
            comb.remove(comb.size() - 1);
        }
    }
}