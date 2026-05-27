class Solution {
    public String solution(String code) {
        StringBuilder ret = new StringBuilder();
        int mode = 0; // 0: 짝수 idx, 1: 홀수 idx
        
        for (int idx = 0; idx < code.length(); idx++) {
            char current = code.charAt(idx);
            
            if (current == '1') {
                mode = 1 - mode; // 토글
            } else if (mode == 0) {
                if (idx % 2 == 0) {
                    ret.append(current);
                }
            } else {
                if (idx % 2 == 1) {
                    ret.append(current);
                }
            }
        }
        
        return ret.length() == 0 ? "EMPTY" : ret.toString();
    }
}