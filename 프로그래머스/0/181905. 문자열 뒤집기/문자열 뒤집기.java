class Solution {
    public String solution(String my_string, int s, int e) {
        StringBuilder sb = new StringBuilder(my_string.substring(s, e + 1));
        String reversed = sb.reverse().toString();
        return my_string.substring(0, s) + reversed + my_string.substring(e + 1);
    }
}
