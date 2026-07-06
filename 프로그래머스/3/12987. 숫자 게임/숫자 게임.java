import java.util.*;

class Solution {
    public int solution(int[] A, int[] B) {
        int answer = 0;
        Arrays.sort(A);
        Arrays.sort(B);
        
        int bIndex = B.length - 1;

        for(int i=A.length-1;i>=0;i--) { //뒤에서부터 비교 -> B가 큰 경우에만 인덱스를 줄여주고 answer++
            if(B[bIndex]>A[i]) {
                answer++;
                bIndex--;
            }
        }
        return answer;
    }
}