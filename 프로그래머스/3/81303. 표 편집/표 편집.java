import java.util.*;

class Solution {
    private Stack<Integer> s = new Stack<>();
    public String solution(int n, int k, String[] cmd) {
        int size = n;
        for(int i=0; i<cmd.length; i++){
            String[] options = cmd[i].split(" ");
            switch(options[0]){
                case "U":
                    k-=Integer.parseInt(options[1]);
                    break;
                case "D":
                    k+=Integer.parseInt(options[1]);
                    break;
                case "C":
                    s.push(k);
                    size-=1;
                    if(k == size) k-=1;
                    break;
                case "Z":
                    if(s.pop() <= k) k+=1;
                    size+=1;
                    break;
            }
        }
        
        StringBuilder sb = new StringBuilder("");
        for(int i=0; i<size; i++) sb.append("O");
        while(!s.isEmpty()) sb.insert(s.pop(), "X");
        
        return sb.toString();
    }
}