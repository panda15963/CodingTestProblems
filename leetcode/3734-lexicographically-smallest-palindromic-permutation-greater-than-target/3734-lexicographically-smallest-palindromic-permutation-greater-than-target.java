import java.util.*;

public class Solution {
    private int[] halfCounts;
    private int halfLen;
    private String target;
    private char midChar;
    private boolean hasMid;
    private StringBuilder currentPath;
    
    // 메모이제이션을 위한 Map (index와 isGreater 상태를 조합한 키 사용)
    private Map<String, String> memo;

    public String lexPalindromicPermutation(String s, String target) {
        this.target = target;
        int n = s.length();
        
        // 1. 문자 빈도수 체크 (알파벳 소문자 26개)
        int[] counts = new int[26];
        for (int i = 0; i < n; i++) {
            counts[s.charAt(i) - 'a']++;
        }
        
        // 회문 가능 여부 확인 (홀수 개 문자가 2개 이상이면 불가)
        int oddCount = 0;
        int oddIdx = -1;
        for (int i = 0; i < 26; i++) {
            if (counts[i] % 2 != 0) {
                oddCount++;
                oddIdx = i;
            }
        }
        if (oddCount > 1) {
            return "";
        }
        
        // 중앙에 올 문자 처리
        this.hasMid = (oddCount == 1);
        if (this.hasMid) {
            this.midChar = (char) ('a' + oddIdx);
        }
        
        // 전반부(First half)에 사용할 문자 개수 세팅
        this.halfCounts = new int[26];
        for (int i = 0; i < 26; i++) {
            this.halfCounts[i] = counts[i] / 2;
        }
        
        this.halfLen = n / 2;
        this.currentPath = new StringBuilder();
        this.memo = new HashMap<>();
        
        return solve(0, false);
    }

    private String solve(int idx, boolean isGreater) {
        // 전반부가 완성된 경우
        if (idx == halfLen) {
            String firstHalf = currentPath.toString();
            StringBuilder sb = new StringBuilder(firstHalf);
            if (hasMid) {
                sb.append(midChar);
            }
            // 후반부는 전반부를 뒤집어서 붙임
            for (int i = firstHalf.length() - 1; i >= 0; i--) {
                sb.append(firstHalf.charAt(i));
            }
            
            String fullPalindrome = sb.toString();
            // target보다 엄격하게 큰 경우에만 정답으로 인정
            if (fullPalindrome.compareTo(target) > 0) {
                return fullPalindrome;
            }
            return "";
        }

        // 메모이제이션 키 생성 (예: "5_true" 또는 "3_false")
        String stateKey = idx + "_" + isGreater;
        if (memo.containsKey(stateKey)) {
            return memo.get(stateKey);
        }

        // 현재 자리(idx)에서 탐색 가능한 최소 문자 결정
        // 이미 target보다 커졌다면 'a'부터, 아니라면 target[idx]부터 시작
        char startChar = isGreater ? 'a' : target.charAt(idx);

        for (char ch = startChar; ch <= 'z'; ch++) {
            int chIdx = ch - 'a';
            if (halfCounts[chIdx] > 0) {
                halfCounts[chIdx]--;
                currentPath.append(ch);

                // 다음 단계의 isGreater 상태 결정
                boolean nextGreater = isGreater || (ch > target.charAt(idx));
                
                String result = solve(idx + 1, nextGreater);
                
                // 알파벳 'a'부터 순서대로 찾으므로 가장 먼저 발견된 결과가 사전순 최소값
                if (!result.isEmpty()) {
                    return result; 
                }

                // 백트래킹 복원
                currentPath.deleteCharAt(currentPath.length() - 1);
                halfCounts[chIdx]++;
            }
        }

        memo.put(stateKey, "");
        return "";
    }
}
