import java.util.*;

class Solution {

    public int[] solution(int n, String[] words) {

        Map<String, Boolean> spokenWords = new HashMap<>();

        int order = 1;
        int phase = 1;

        String prevWord = String.valueOf(words[0].charAt(0));

        for (String word : words) {

            if (spokenWords.containsKey(word) ||
                prevWord.charAt(prevWord.length() - 1) != word.charAt(0)) {

                return new int[]{order, phase};
            }

            if (order == n) {
                phase++;
            }

            spokenWords.put(word, true);
            prevWord = word;
            order = (order % n) + 1;
        }

        return new int[]{0, 0};
    }
}