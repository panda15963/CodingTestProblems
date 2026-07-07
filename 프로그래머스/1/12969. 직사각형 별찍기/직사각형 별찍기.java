import java.util.Scanner;

public class coding_test_01 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int a = sc.nextInt();
        int b = sc.nextInt();

        for(int i = 0; i < b; i++){ //*의 세로
            for(int j = 0; j < a; j++){ //*읠 가로 
                System.out.print("*");
            }
            System.out.println(); //개행
        }
    }
}