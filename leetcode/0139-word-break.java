class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        // n번째 문자까지 탐색결과를 저장할 배열
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        
        // i번째 자리수가 참이되는 경우를 탐색
        for(int i = 1; i <= s.length(); i++) {
            // 잘라낼 단어의 길이를 증가시키며 탐색
            for(int j = i - 1; j >= 0; j--) {
                String word = s.substring(j, i);
                // 잘라낸 단어가 리스트에 포함되고
                // 이전까지의 결과값이 true인 경우
                // 현재 인덱스의 결과를 true로 설정하고 탐색 종료
                if(wordDict.contains(word) && dp[j]) {
                    dp[i] = true;
                    break;
                }
            }
        }
        
        // 최종 탐색 결과값을 return
        return dp[s.length()];
    }
}