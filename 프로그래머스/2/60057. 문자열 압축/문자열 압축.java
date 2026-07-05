import java.util.*;

class Solution {

    public int solution(String s) {

        if (s.length() == 1) {
            return 1;
        }

        int min = Integer.MAX_VALUE;
        int n = s.length() / 2;

        for (int i = 1; i <= n; i++) {

            ArrayList<String> words = new ArrayList<>();
            ArrayList<Integer> counts = new ArrayList<>();

            for (int j = 0; j < s.length(); j += i) {

                String cur = s.substring(j, Math.min(j + i, s.length()));

                if (!words.isEmpty()) {

                    if (cur.equals(words.get(words.size() - 1))) {
                        counts.set(
                                counts.size() - 1,
                                counts.get(counts.size() - 1) + 1
                        );
                    } else {
                        words.add(cur);
                        counts.add(1);
                    }

                } else {
                    words.add(cur);
                    counts.add(1);
                }
            }

            int length = 0;

            for (String word : words) {
                length += word.length();
            }

            for (int cnt : counts) {
                if (cnt > 1) {
                    length += String.valueOf(cnt).length();
                }
            }

            min = Math.min(min, length);
        }

        return min;
    }
}