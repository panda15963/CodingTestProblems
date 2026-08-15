class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        Map<Character, List<String>> dict = new HashMap<>();

        // 단어의 마지막 문자를 기준으로 그룹화
        for (String word : wordDict) {
            char lastChar = word.charAt(word.length() - 1);

            dict.computeIfAbsent(lastChar, k -> new ArrayList<>())
                .add(word);
        }

        // dp[i] = s[0...i]를 만들 수 있는 모든 문장
        @SuppressWarnings("unchecked")
        List<String>[] dp = new ArrayList[s.length()];

        return dfs(s, dict, dp, s.length() - 1);
    }

    private List<String> dfs(
        String s,
        Map<Character, List<String>> dict,
        List<String>[] dp,
        int lastInd
    ) {
        // 더 이상 확인할 문자가 없는 경우
        if (lastInd < 0) {
            return new ArrayList<>(List.of(""));
        }

        // 이미 계산한 경우
        if (dp[lastInd] != null) {
            return dp[lastInd];
        }

        dp[lastInd] = new ArrayList<>();

        char lastChar = s.charAt(lastInd);

        List<String> words = dict.getOrDefault(
            lastChar,
            new ArrayList<>()
        );

        for (String word : words) {
            int firstInd = lastInd - word.length() + 1;

            // 시작 인덱스가 음수이면 불가능
            if (firstInd < 0) {
                continue;
            }

            // 해당 구간이 word와 같은지 확인
            if (s.substring(firstInd, lastInd + 1).equals(word)) {

                for (String tmp : dfs(s, dict, dp, firstInd - 1)) {
                    if (tmp.isEmpty()) {
                        dp[lastInd].add(word);
                    } else {
                        dp[lastInd].add(tmp + " " + word);
                    }
                }
            }
        }

        return dp[lastInd];
    }
}