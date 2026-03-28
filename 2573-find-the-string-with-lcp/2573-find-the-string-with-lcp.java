class Solution {
    public String findTheString(int[][] lcp) {
        int n = lcp.length;
        char[] word = new char[n];
        int idx = 0;

        // 1. a~z 까지 사용하며, 그리디로 문자 배정
        for (char c = 'a'; c <= 'z'; c++) {
            while (idx < n && word[idx] != 0) idx++;
            if (idx == n) break;

            // lcp[idx][j] > 0 인 j는 idx랑 같은 문자
            for (int j = idx; j < n; j++) {
                if (lcp[idx][j] > 0) {
                    word[j] = c;
                }
            }
        }

        // 2. 문자열이 모두 채워졌는지 확인
        for (int i = 0; i < n; i++) {
            if (word[i] == 0) return "";
        }

        // 3. LCP 조건 검증
        for (int i = n - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                if (word[i] == word[j]) {
                    int expect = (i == n - 1 || j == n - 1) ? 1 : lcp[i + 1][j + 1] + 1;
                    if (lcp[i][j] != expect) return "";
                } else {
                    if (lcp[i][j] != 0) return "";
                }
            }
        }

        return new String(word);
    }
}