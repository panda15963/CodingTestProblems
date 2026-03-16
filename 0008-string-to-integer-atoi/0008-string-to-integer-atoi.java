class Solution {
    public int myAtoi(String s) {
        int i = 0;
        int n = s.length();
        
        int sign = 1;
        int result = 0;
        
        int INT_MAX = Integer.MAX_VALUE;
        int INT_MIN = Integer.MIN_VALUE;

        // 1. 공백 제거
        while (i < n && s.charAt(i) == ' ') {
            i++;
        }

        // 2. 부호 확인
        if (i < n && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
            sign = (s.charAt(i) == '-') ? -1 : 1;
            i++;
        }

        // 3. 숫자 읽기
        while (i < n && Character.isDigit(s.charAt(i))) {
            int digit = s.charAt(i) - '0';

            // 4. overflow 검사
            if (result > (INT_MAX - digit) / 10) {
                return sign == 1 ? INT_MAX : INT_MIN;
            }

            result = result * 10 + digit;
            i++;
        }

        return result * sign;
    }
}