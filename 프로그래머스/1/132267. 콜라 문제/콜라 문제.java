class Solution {
    public int solution(int a, int b, int n) {
        int answer = 0;
        
        while (n >= a) {
            // 이번에 마트에서 교환받는 콜라의 수
            int received = (n / a) * b;
            answer += received;
            
            // 남은 빈 병 = 교환 후 남은 병 + 새로 받은 콜라
            n = (n % a) + received;
        }
        
        return answer;
    }
}
