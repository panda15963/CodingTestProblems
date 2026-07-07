import java.util.Arrays;
class Solution {
    public int solution(int[] arr) {
        int answer = 1;
        int num = 2;
        Arrays.sort(arr);
        int max = arr[arr.length -1];
        if(max == 1) return max;
        while(max >= num){
            boolean bool = false;
            for(int i = 0 ; i < arr.length ; i++){
                if(arr[i] % num == 0){
                    arr[i] = arr[i]/num;
                    bool = true;
                }
            }
            if(bool) answer *= num;
            else num++;
        }
        for(int i = 0 ; i < arr.length ; i++){
            answer *= arr[i];
        }
        return answer;
    }
}