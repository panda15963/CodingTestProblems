class Solution {
    public String solution(String myString) {
        StringBuilder sb = new StringBuilder();
        
        for (char c : myString.toCharArray()) {
            // 'l'의 아스키코드값은 108입니다.
            if (c < 'l') {
                sb.append('l');
            } else {
                sb.append(c);
            }
        }
        
        return sb.toString();
    }
}
