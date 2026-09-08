class Solution {
    public boolean isAnagram(String s, String t) {
        int sLen = s.length();
        int tLen = t.length();
        
        if (sLen != tLen) {
            return false;
        }
        
        int[] alphabet = new int[26];
        
        for(int i = 0; i < sLen; i++) {
            alphabet[s.charAt(i) - 'a'] ++;
        }
        
        for(int i = 0; i < tLen; i++) {
            alphabet[t.charAt(i) - 'a'] --;
        }
        
        for(int num : alphabet) {
            if(num != 0) {
                return false;
            }
        }
        
        return true;
    }
}
출처: https://devraphy.tistory.com/553 [개발자를 향하여:티스토리]