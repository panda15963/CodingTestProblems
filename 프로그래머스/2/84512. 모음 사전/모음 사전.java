class Solution {
    static String[] vowels = {"A", "E", "I", "O", "U"};
    static int count = 0;
    static int answer = 0;

    public int solution(String word) {
        dfs("", word);
        return answer;
    }

    private void dfs(String current, String word) {
        if (current.equals(word)) {
            answer = count;
            return;
        }

        if (current.length() == 5) return;

        for (int i = 0; i < 5; i++) {
            count++;
            dfs(current + vowels[i], word);
            if (answer != 0) return;
        }
    }
}