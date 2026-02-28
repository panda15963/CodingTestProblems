import java.util.Scanner;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String str = sc.next();
        int n = sc.nextInt();
        System.out.println(str.repeat(n));  // Java 11+ repeat() 메서드 사용 [web:9][web:12]
        sc.close();
    }
}