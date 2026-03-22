import java.util.*;

class Solution {
    public String solution(String[] id_pw, String[][] db) {
        String id = id_pw[0];
        String pw = id_pw[1];
        for (String[] user : db) {
            if (user[0].equals(id)) {
                return user[1].equals(pw) ? "login" : "wrong pw";
            }
        }
        return "fail";
    }
}
