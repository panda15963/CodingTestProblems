class Solution {
    public int[] solution(int[] num_list) {
        int n = num_list.length;
        
        // 길이 + 1인 새 배열 생성
        int[] answer = new int[n + 1];
        
        // 기존 값 복사
        for (int i = 0; i < n; i++) {
            answer[i] = num_list[i];
        }
        
        // 마지막 두 원소
        int last = num_list[n - 1];
        int prev = num_list[n - 2];
        
        // 조건에 따라 마지막 값 추가
        if (last > prev) {
            answer[n] = last - prev;
        } else {
            answer[n] = last * 2;
        }
        
        return answer;
    }
}
