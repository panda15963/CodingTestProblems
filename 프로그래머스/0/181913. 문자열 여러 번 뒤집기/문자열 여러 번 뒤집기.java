class Solution {
    public String solution(String my_string, int[][] queries) {
        StringBuilder sb = new StringBuilder(my_string);
        for (int[] q : queries) {
            int s = q[0], e = q[1];
            sb.replace(s, e + 1, new StringBuilder(sb.substring(s, e + 1)).reverse().toString());
        }
        return sb.toString();
    }
}
