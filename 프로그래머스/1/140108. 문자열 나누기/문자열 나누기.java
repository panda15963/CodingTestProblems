class Solution {
    public int solution(String s) {
        int answer = 0;
        char x = ' ';
        int sameCount = 0;
        int diffCount = 0;
        
        for (int i = 0; i < s.length(); i++) {
            // 1. 첫 글자를 읽고 x에 저장
            if (sameCount == 0 && diffCount == 0) {
                x = s.charAt(i);
            }
            
            // 2. x와 같은지 다른지에 따라 횟수 증가
            if (s.charAt(i) == x) {
                sameCount++;
            } else {
                diffCount++;
            }
            
            // 3. 두 횟수가 같아지는 순간 문자열 분리
            if (sameCount == diffCount) {
                answer++;
                sameCount = 0; // 초기화
                diffCount = 0;
            }
        }
        
        // 4. 문자열이 남아있는 상태로 반복문이 끝난 경우
        if (sameCount > 0 || diffCount > 0) {
            answer++;
        }
        
        return answer;
    }
}
