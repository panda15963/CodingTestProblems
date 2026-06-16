public class Solution {
    public String processStr(String s) {
        StringBuilder result = new StringBuilder();
        
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            
            if (Character.isLowerCase(ch)) {
                // Lowercase letters: Append to the result
                result.append(ch);
            } else if (ch == '*') {
                // Asterisk: Backspace operation
                if (result.length() > 0) {
                    result.deleteCharAt(result.length() - 1);
                }
            } else if (ch == '#') {
                // Hash: Duplicate the entire current result string
                result.append(result.toString());
            } else if (ch == '%') {
                // Percent: Reverse the entire current result string
                result.reverse();
            }
        }
        
        return result.toString();
    }
}
