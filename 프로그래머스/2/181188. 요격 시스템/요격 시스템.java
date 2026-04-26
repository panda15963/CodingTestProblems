import java.util.*;

class Solution {
    public int solution(int[][] targets) {
        // end를 기준으로 오름차순 정렬
        Arrays.sort(targets,(o1,o2)-> o1[1]-o2[1]);
        
        int currEnd = -1;
        int ans = 0;
        
        // 정렬된 폭격 미사일 하나씩 접근하기
        for(int[] target : targets){
            
            // 첫 폭격미사일인 경우
            if(currEnd == -1){
                ans++; // 요격미사일 카운트
                currEnd = target[1];
                continue;
            } 
            
            // start가 현재 end보다 작으면 이미 발사된 요격미사일에 요격됨
            if(target[0] < currEnd) continue;
            
            ans++; // 요격미사일 카운트
            currEnd = target[1]; // 현재 end update하기

        }
        
        return ans;
 
    }
}