import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    static String gs;
    static int len;
    static int dp[][];
    static List<List<String>> result;
    public List<List<String>> partition(String s) {
        gs = s;
        len = gs.length();
        result = new ArrayList<>();
        dp = new int[len][len];
        
        for (int i = 0; i < len; i++) dp[i][i] = 1;
        
        for (int i = 0; i < len - 1; i++)
            if (s.charAt(i) == s.charAt(i + 1)) dp[i][i + 1] = 1;
            else dp[i][i + 1] = 0;
            
        for (int i = 3; i < len + 1; i++) {
            for (int j = 0; j < len - i + 1; j++) {
                int start = j;
                int end = j + i - 1;
                if (s.charAt(start) == s.charAt(end) && dp[start + 1][end - 1] == 1) dp[start][end] = 1;
            }
        }
        
        dfs("",0);
        return result;
    }
    static void dfs(String substrings, int now){
        for(int i = now;i<len;i++){
            if(dp[now][i] == 1){
                String new_substrings=substrings+gs.substring(now,i+1)+" ";
                if(i == len-1) result.add(Arrays.asList(new_substrings.split(" ")));
                else dfs(new_substrings, i+1);
            }
        }
    }
}