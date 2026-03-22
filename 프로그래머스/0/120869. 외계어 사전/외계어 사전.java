import java.util.Arrays;

class Solution {
    public int solution(String[] spell, String[] dic) {
        String spellStr = Arrays.stream(spell)
                               .sorted()
                               .reduce("", String::concat);
        
        for (String word : dic) {
            if (word.length() == spell.length) {
                char[] chars = word.toCharArray();
                Arrays.sort(chars);
                if (new String(chars).equals(spellStr)) {
                    return 1;
                }
            }
        }
        return 2;
    }
}