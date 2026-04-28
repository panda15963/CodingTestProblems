class Solution {
    public int[] solution(int[] sequence, int k) {
        int[] answer = new int[2];
        // 투 포인트 선언
        int left = 0;
        int right = 0;
        // 합계값
        int sum = 0;
        int size = sequence.length;
        
        for(right = 0; right<sequence.length; right++){
            //차례대로 더해줌
            sum += sequence[right];
            
            //sum이 k보다 크다면, left를 한 칸 오른쪽으로 이동
            while(right<sequence.length && sum > k){
                // 이동한 값을 빼준다
                sum -=sequence[left];
                left++;
            }
            // sum이 같으면
            if (sum == k){
                // 원소간 길이 비교 후 짧은 것을 답에다 넣는다
                if (size > right - left){
                    size = right - left;
                    answer[0] = left;
                    answer[1] = right;
                }
            }   
        }
        return answer;
    }
}