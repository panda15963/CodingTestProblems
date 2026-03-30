class Solution {
    public boolean checkStrings(String s1, String s2) {
        int[] even1 = new int[26];
        int[] odd1 = new int[26];
        int[] even2 = new int[26];
        int[] odd2 = new int[26];

        for (int i = 0; i < s1.length(); i++) {
            int idx1 = s1.charAt(i) - 'a';
            int idx2 = s2.charAt(i) - 'a';

            if (i % 2 == 0) {
                even1[idx1]++;
                even2[idx2]++;
            } else {
                odd1[idx1]++;
                odd2[idx2]++;
            }
        }

        return isEqual(even1, even2) && isEqual(odd1, odd2);
    }

    private boolean isEqual(int[] a, int[] b) {
        for (int i = 0; i < 26; i++) {
            if (a[i] != b[i]) return false;
        }
        return true;
    }
}