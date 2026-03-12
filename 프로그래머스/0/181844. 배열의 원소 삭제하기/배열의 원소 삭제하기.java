import java.util.*;

class Solution {
    public int[] solution(int[] arr, int[] delete_list) {
        Set<Integer> set = new HashSet<>();
        for (int del : delete_list) {
            set.add(del);
        }
        
        List<Integer> list = new ArrayList<>();
        for (int x : arr) {
            if (!set.contains(x)) {
                list.add(x);
            }
        }
        
        return list.stream().mapToInt(i -> i).toArray();
    }
}
