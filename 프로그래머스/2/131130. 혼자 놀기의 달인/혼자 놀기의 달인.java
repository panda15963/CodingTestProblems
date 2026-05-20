import java.util.*;

class Solution {
    public int solution(int[] cards) {
        boolean[] visited = new boolean[cards.length];
        List<Integer> groupSizes = new ArrayList<>();

        for (int i = 0; i < cards.length; i++) {
            if (!visited[i]) {
                int current = i;
                int size = 0;

                while (!visited[current]) {
                    visited[current] = true;
                    current = cards[current] - 1; // 1번 상자는 인덱스 0이므로 -1
                    size++;
                }
                groupSizes.add(size);
            }
        }

        // 상자 그룹이 2개 이상일 경우 큰 그룹 두 개를 곱함
        if (groupSizes.size() >= 2) {
            Collections.sort(groupSizes, Collections.reverseOrder());
            return groupSizes.get(0) * groupSizes.get(1);
        }

        // 상자 그룹이 1개뿐이라면 점수는 0점
        return 0;
    }
}
