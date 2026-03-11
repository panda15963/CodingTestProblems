class Solution {
    public String solution(String n_str) {
        int idx = 0;
        // 앞에서부터 0이 아닌 문자가 나올 때까지 이동
        while (idx < n_str.length() && n_str.charAt(idx) == '0') {
            idx++;
        }
        return n_str.substring(idx);
    }
}
