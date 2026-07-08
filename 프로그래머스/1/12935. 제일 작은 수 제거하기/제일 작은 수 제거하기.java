import java.util.*;
class Solution {
    public int[] solution(int[] arr) {
        int[] answer = {};

        if (arr.length == 1) {
            return answer = new int[]{-1};
        }
        int min = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (min > arr[i]) {
                min = arr[i];
            }
        }
        List<Integer> list = new ArrayList<>();

        for (int i = 0; i < arr.length; i++) {
            if (min != arr[i]) {
                list.add(arr[i]);
            }
        }
        answer = new int[list.size()];
        for (int i = 0; i < list.size(); i++) {
            if (list.get(i) != min){
                answer[i] = list.get(i);
            }
        }
        return answer;
    }
}