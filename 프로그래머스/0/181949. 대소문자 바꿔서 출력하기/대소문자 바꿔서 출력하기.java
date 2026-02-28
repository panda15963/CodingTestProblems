import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.next();
        String result = "";
        for (int i = 0; i < str.length(); i++) {
            char c = str.charAt(i);
            if (Character.isUpperCase(c)) {
                result += Character.toLowerCase(c);  // 대문자 → 소문자 [web:52]
            } else {
                result += Character.toUpperCase(c);  // 소문자 → 대문자 [web:52]
            }
        }
        System.out.println(result);
    }
}