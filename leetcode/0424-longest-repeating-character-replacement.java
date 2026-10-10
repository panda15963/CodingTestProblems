class Solution {
    public int characterReplacement(String s, int k) {
        int maxLen = 0;
        int maxCnt = 0;
        int[] counter = new int[26];
        int start = 0;

        for (int end = 0; end < s.length(); end++) {
            int index = s.charAt(end) - 'A';
            counter[index]++;
            maxCnt = Math.max(counter[index], maxCnt);

            if (end - start + 1 - maxCnt > k) {
                counter[s.charAt(start) - 'A']--;
                start++;
            }

            maxLen = Math.max(end - start + 1, maxLen);
        }

        return maxLen;
    }
}