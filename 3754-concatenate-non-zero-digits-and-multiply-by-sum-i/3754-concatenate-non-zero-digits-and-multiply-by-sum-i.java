class Solution {
    public long sumAndMultiply(int n) {
        long x = 0;
        long sum = 0;
        
        // Convert to string to easily traverse left-to-right
        String str = String.valueOf(n);
        
        for (char ch : str.toCharArray()) {
            if (ch != '0') {
                int digit = ch - '0';
                sum += digit;
                x = x * 10 + digit;
            }
        }
        
        return x * sum;
    }
}
