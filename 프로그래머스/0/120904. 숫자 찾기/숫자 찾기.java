class Solution {
    public int solution(int num, int k) {
        String s = String.valueOf(num);   // num을 문자열로 변환
        int idx = s.indexOf(String.valueOf(k));  // k가 처음 나오는 위치 (0-base)

        if (idx == -1) {
            return -1;  // k가 없으면 -1 반환
        } else {
            return idx + 1;  // 자리 수(1-based)로 변환하여 반환
        }
    }
}
