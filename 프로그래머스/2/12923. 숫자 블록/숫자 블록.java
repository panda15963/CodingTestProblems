class Solution {
    public int[] solution(long begin, long end) {
        int size = (int) (end - begin) + 1;
        int[] answer = new int[size];
        
        // begin부터 end까지 값들을 살피며 해당 값을 나눌 수 있는 최대 값을 구한다.
        for(int i = (int) begin, idx = 0; i <= end; i++) {
            answer[idx++] = getMaxDivider(i);
        }
        
        return answer;
    }
    
    public static int getMaxDivider(int num) {
        // 만약에 1번 자리가 들어올 경우 무조건 0을 반환
        if(num == 1) return 0;
        
        // 지금 보고 있는 num을 나눌 수 있는 최대값을 기록하는 max
        int max = 0;
        
        // 제곱근은 자기 자신을 나눌 수 있는 수의 절반이기에 2부터 제곱근까지 확인
        for(int i = 2; i <= Math.sqrt(num); i++) {
            // 나눠지는 수를 확인해서 해당 값을 max에 기록
            if(num % i == 0) {
                max = i;
                // 만약에 나눠진 몫이 블록의 최대 값인 10,000,000보다 작으면 해당 몫이 자신을 나눌 수 있는 최대값이기에 이를 반환
                if(num / i <= 10000000) return num / i;
            }
        }
        
        // 나눈 몫들 중에 10,000,000보다 작은 수가 없었던 경우 찾아낸 자신을 나눌 수 있는 최대값인 max를 반환
        if(max != 0) {
            return max;
        }
        
        // 만약 자신이 소수라 나눌 수 있는 수가 없었던 경우 1을 반환
        return 1;
    }
}