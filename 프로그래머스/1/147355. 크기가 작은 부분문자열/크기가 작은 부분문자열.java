class Solution {
    public int solution(String t, String p) {
        int answer = 0;
        int pLen = p.length();
        long pLong = Long.parseLong(p); // p를 long으로 변환

        // t에서 나올 수 있는 부분문자열 개수만큼 반복
        for (int i = 0; i <= t.length() - pLen; i++) {
            // p 길이만큼 substring
            String sub = t.substring(i, i + pLen);
            long subLong = Long.parseLong(sub); // 부분문자열을 long으로 변환
            
            // 크기 비교
            if (subLong <= pLong) {
                answer++;
            }
        }
        return answer;
    }
}
