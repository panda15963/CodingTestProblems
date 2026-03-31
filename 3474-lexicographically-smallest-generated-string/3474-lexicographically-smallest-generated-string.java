import java.util.*;

class Solution {
    public String generateString(String str1, String str2) {
        int n = str1.length();
        int m = str2.length();
        int size = n + m - 1;

        char[] word = new char[size];
        boolean[] fixed = new boolean[size];

        Arrays.fill(word, '?');

        // 1. T 조건 강제 적용
        for (int i = 0; i < n; i++) {
            if (str1.charAt(i) == 'T') {
                for (int j = 0; j < m; j++) {
                    if (word[i + j] == '?' || word[i + j] == str2.charAt(j)) {
                        word[i + j] = str2.charAt(j);
                        fixed[i + j] = true;
                    } else {
                        return "";
                    }
                }
            }
        }

        // 2. '?' → 'a'
        for (int i = 0; i < size; i++) {
            if (word[i] == '?') word[i] = 'a';
        }

        // 3. F 조건 처리
        for (int i = 0; i < n; i++) {
            if (str1.charAt(i) == 'F') {
                boolean match = true;

                for (int j = 0; j < m; j++) {
                    if (word[i + j] != str2.charAt(j)) {
                        match = false;
                        break;
                    }
                }

                if (match) {
                    boolean changed = false;

                    // 뒤에서부터 변경
                    for (int j = m - 1; j >= 0; j--) {
                        if (!fixed[i + j] && word[i + j] != 'z') {
                            word[i + j]++;
                            changed = true;
                            break;
                        }
                    }

                    if (!changed) return "";
                }
            }
        }

        return new String(word);
    }
}