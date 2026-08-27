public class Solution {
    public String lexGreaterPermutation(String s, String target) {
        int n = s.length();
        int[] count = new int[26];
        
        // s의 문자 빈도수 카운트
        for (int i = 0; i < n; i++) {
            count[s.charAt(i) - 'a']++;
        }
        
        char[] result = new char[n];
        
        // 1단계: target과 최대한 일치시키며 매칭 시도
        int matchLen = 0;
        for (int i = 0; i < n; i++) {
            int tIdx = target.charAt(i) - 'a';
            if (count[tIdx] > 0) {
                result[i] = target.charAt(i);
                count[tIdx]--;
                matchLen++;
            } else {
                break; // target의 현재 문자가 없으면 일치시키기 중단
            }
        }
        
        // 2단계: 뒤에서부터 분기점(Divergence Point)을 찾으며 역추적
        for (int i = matchLen; i >= 0; i--) {
            // i == n 인 경우는 s의 순열이 target과 완전히 똑같아진 상태이므로, 
            // target보다 '엄격히 큰' 문자열을 만들기 위해 마지막 문자 위치(n-1)를 분기점으로 돌려야 합니다.
            if (i == n) {
                i--; 
                // 복구
                count[result[i] - 'a']++;
            }
            
            int targetCharIdx = target.charAt(i) - 'a';
            
            // target.charAt(i) 보다 사전순으로 큰 가장 작은 사용 가능한 문자를 탐색
            int nextCharIdx = -1;
            for (int c = targetCharIdx + 1; c < 26; c++) {
                if (count[c] > 0) {
                    nextCharIdx = c;
                    break;
                }
            }
            
            // 더 큰 문자를 찾았다면 이 자리에 배치하고 남은 자리를 사전순 최소로 채움
            if (nextCharIdx != -1) {
                result[i] = (char) (nextCharIdx + 'a');
                count[nextCharIdx]--;
                
                // i 이후의 모든 남은 공간을 남은 문자들 중 가장 작은 문자들로 채움
                int resIdx = i + 1;
                for (int c = 0; c < 26; c++) {
                    while (count[c] > 0) {
                        result[resIdx++] = (char) (c + 'a');
                        count[c]--;
                    }
                }
                return new String(result);
            }
            
            // 만약 i번째 자리에서 더 큰 문자를 찾지 못했다면, 
            // 한 칸 앞의 자리(i-1)를 분기점으로 삼기 위해 현재 맞춰놓았던 문자를 원상복구(Backtrack)합니다.
            if (i > 0) {
                count[result[i - 1] - 'a']++;
            }
        }
        
        // 어떤 분기점에서도 target보다 큰 순열을 만들지 못했다면 빈 문자열 반환
        return "";
    }
}
