class Solution {
    public char findTheDifference(String s, String t) {
        int ascS = 0;
        int ascT = t.charAt(t.length() - 1);

        for (int i = 0; i < s.length(); i++) {
            ascS += s.charAt(i);
            ascT += t.charAt(i);
        }

        return (char)(ascT - ascS);
    }
}