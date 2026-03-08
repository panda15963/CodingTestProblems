class Solution {
    public String solution(String myString, String pat) {
        int lastPos = myString.lastIndexOf(pat);
        return myString.substring(0, lastPos + pat.length());
    }
}
