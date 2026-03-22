import java.util.*;

class Solution {
    public int solution(String[] babbling) {
        String[] words = {"aya", "ye", "woo", "ma"};
        int count = 0;
        for (String b : babbling) {
            String temp = b;
            for (String w : words) {
                temp = temp.replace(w, " ");
            }
            if (temp.trim().isEmpty()) {
                count++;
            }
        }
        return count;
    }
}
