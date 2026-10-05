class Solution {
    public String removeKdigits(String num, int k) {
        if (num.length() == k) {
            return "0";
        }

        StringBuilder stack = new StringBuilder();

        for (int i = 0; i < num.length(); i++) {
            char current = num.charAt(i);

            while (
                k > 0 &&
                stack.length() > 0 &&
                stack.charAt(stack.length() - 1) > current
            ) {
                stack.deleteCharAt(stack.length() - 1);
                k--;
            }

            stack.append(current);
        }

        while (k > 0) {
            stack.deleteCharAt(stack.length() - 1);
            k--;
        }

        int start = 0;

        while (
            start < stack.length() &&
            stack.charAt(start) == '0'
        ) {
            start++;
        }

        if (start == stack.length()) {
            return "0";
        }

        return stack.substring(start);
    }
}