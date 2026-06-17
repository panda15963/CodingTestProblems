class Solution {
    public char processStr(String s, long k) {
        long m = 0;
        
        // Pass 1: Find the total length of the final string
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (c == '*') {
                m = Math.max(0, m - 1);
            } else if (c == '#') {
                m <<= 1; // Double the length
            } else if (c != '%') {
                m += 1;  // Normal lowercase letter
            }
            // '%' does not change the string length
        }
        
        // If k is out of bounds, return '.'
        if (k >= m) {
            return '.';
        }
        
        // Pass 2: Work backward from the end of s to locate index k
        for (int i = s.length() - 1; i >= 0; i--) {
            char c = s.charAt(i);
            
            if (c == '*') {
                m += 1; 
            } else if (c == '#') {
                m /= 2;
                if (k >= m) {
                    k -= m; // Map to the matching index in the first half
                }
            } else if (c == '%') {
                k = m - 1 - k; // Map to the mirrored index due to reversal
            } else {
                m -= 1;
                if (k == m) {
                    return c; // Target character found
                }
            }
        }
        
        return '.';
    }
}
