import java.util.*;

class Solution {

    Map<String, List<Integer>> map = new HashMap<>();

    public int[] solution(String[] info, String[] query) {

        // 모든 조합 생성
        for (String str : info) {

            String[] arr = str.split(" ");

            dfs(0, "", arr);

        }

        // 점수 정렬
        for (List<Integer> list : map.values()) {
            Collections.sort(list);
        }

        int[] answer = new int[query.length];

        for (int i = 0; i < query.length; i++) {

            String q = query[i].replaceAll(" and ", " ");

            String[] arr = q.split(" ");

            StringBuilder key = new StringBuilder();

            for (int j = 0; j < 4; j++) {
                if (!arr[j].equals("-")) {
                    if (key.length() > 0) key.append(" ");
                    key.append(arr[j]);
                }
            }

            int score = Integer.parseInt(arr[4]);

            if (!map.containsKey(key.toString())) {
                answer[i] = 0;
                continue;
            }

            List<Integer> list = map.get(key.toString());

            int idx = lowerBound(list, score);

            answer[i] = list.size() - idx;
        }

        return answer;
    }

    void dfs(int depth, String key, String[] arr) {

        if (depth == 4) {

            map.computeIfAbsent(key.trim(), k -> new ArrayList<>())
                    .add(Integer.parseInt(arr[4]));

            return;
        }

        // 선택
        dfs(depth + 1,
                key + (key.isEmpty() ? "" : " ") + arr[depth],
                arr);

        // 선택 안함
        dfs(depth + 1, key, arr);
    }

    int lowerBound(List<Integer> list, int target) {

        int left = 0;
        int right = list.size();

        while (left < right) {

            int mid = (left + right) / 2;

            if (list.get(mid) >= target) {
                right = mid;
            } else {
                left = mid + 1;
            }

        }

        return left;
    }

}