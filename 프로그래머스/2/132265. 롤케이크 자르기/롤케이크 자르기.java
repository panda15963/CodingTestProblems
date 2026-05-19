import java.util.*;

class Solution {
    public int solution(int[] topping) {
        int answer = 0;
        
        // 1. 토핑의 종류는 1~10000 제한이므로, 개수를 셀 배열 선언
        int[] left = new int[10001]; // 철수
        int[] right = new int[10001]; // 동생
        
        int leftCount = 0;
        int rightCount = 0;
        
        // 2. 초기 세팅: 모든 토핑을 오른쪽(동생)에 몰아주기
        for (int t : topping) {
            if (right[t] == 0) rightCount++;
            right[t]++;
        }
        
        // 3. 포인터를 이동하며 왼쪽(철수)으로 토핑 하나씩 옮기기
        for (int t : topping) {
            // 왼쪽(철수)에 추가
            if (left[t] == 0) leftCount++;
            left[t]++;
            
            // 오른쪽(동생)에서 제거
            right[t]--;
            if (right[t] == 0) rightCount--;
            
            // 4. 두 조각의 토핑 종류 수가 같다면 정답 카운트 추가
            if (leftCount == rightCount) {
                answer++;
            }
        }
        
        return answer;
    }
}
