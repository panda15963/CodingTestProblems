class Solution {
    public String addStrings(String num1, String num2) {
        int len1 = num1.length() - 1;
        int len2 = num2.length() - 1;

        int max = Math.max(num1.length(), num2.length());
        int carry = 0;
        StringBuilder answer = new StringBuilder();

        for (int i = 0; i < max; i++) {
            int digit1 = len1 - i >= 0 ? num1.charAt(len1 - i) - '0' : 0;
            int digit2 = len2 - i >= 0 ? num2.charAt(len2 - i) - '0' : 0;

            int sum = carry + digit1 + digit2;
            carry = sum / 10;

            answer.append(sum % 10);
        }

        if (carry > 0) {
            answer.append(carry);
        }

        return answer.reverse().toString();
    }
}