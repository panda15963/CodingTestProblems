import java.util.*;

class Solution {
    public int solution(String my_string) {
        String[] tokens = my_string.split(" ");
        int result = Integer.parseInt(tokens[0]);
        for (int i = 1; i < tokens.length; i += 2) {
            int num = Integer.parseInt(tokens[i + 1]);
            if ("+".equals(tokens[i])) result += num;
            else result -= num;
        }
        return result;
    }
}
