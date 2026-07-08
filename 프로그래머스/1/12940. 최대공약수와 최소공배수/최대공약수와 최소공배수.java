class Solution {
    public int[] solution(int n, int m) {
        int[] answer = new int[2];
        int a = n;
        int b = m;
        
        // 유클리드 호제법으로 최대공약수 구하기
        while(b > 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        
        answer[0] = a; // 최대공약수
        answer[1] = (n * m) / a; // 최소공배수
        
        return answer;
    }
}
