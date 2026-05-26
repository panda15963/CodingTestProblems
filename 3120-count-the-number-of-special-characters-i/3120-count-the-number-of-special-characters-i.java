import java.util.HashMap;
import java.util.Map;

public class Solution {
    public int numberOfSpecialChars(String word) {
        Map<Character, Boolean> map = new HashMap<>();
        String newWord = word.toLowerCase();

        for (int i = 0; i < word.length(); i++) {
            char lowerChar = newWord.charAt(i);

            if (!map.containsKey(lowerChar)) {
                char originalChar = word.charAt(i);

                if (lowerChar != originalChar) {
                    // 현재 문자가 대문자인 경우
                    if (word.indexOf(lowerChar) != -1) {
                        map.put(lowerChar, true);
                    }
                } else {
                    // 현재 문자가 소문자인 경우
                    char upperChar = Character.toUpperCase(lowerChar);
                    if (word.indexOf(upperChar) != -1) {
                        map.put(lowerChar, true);
                    }
                }
            }
        }

        return map.size();
    }
}