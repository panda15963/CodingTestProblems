import java.util.*;
import java.util.regex.Pattern;

class Solution {

    List<List<String>> answers = new ArrayList<>();
    List<String> check = new ArrayList<>();
    List<List<String>> candidates = new ArrayList<>();
    int N;

    void dfs(int now) {
        if (now == N) {
            List<String> temp = new ArrayList<>(check);
            Collections.sort(temp);

            if (!answers.contains(temp)) {
                answers.add(temp);
            }
            return;
        }

        for (String id : candidates.get(now)) {
            if (!check.contains(id)) {
                check.add(id);
                dfs(now + 1);
                check.remove(check.size() - 1);
            }
        }
    }

    public int solution(String[] user_id, String[] banned_id) {

        N = banned_id.length;

        for (int i = 0; i < N; i++) {
            candidates.add(new ArrayList<>());
        }

        // 정규식을 이용하여 후보 찾기
        for (int i = 0; i < N; i++) {

            String regex = banned_id[i].replace('*', '.');
            Pattern pattern = Pattern.compile(regex);

            for (String id : user_id) {
                if (banned_id[i].length() == id.length()
                        && pattern.matcher(id).matches()) {
                    candidates.get(i).add(id);
                }
            }
        }

        dfs(0);

        return answers.size();
    }
}