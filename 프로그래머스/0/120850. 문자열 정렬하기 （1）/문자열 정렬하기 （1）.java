import java.util.*;

class Solution {
    public int[] solution(String my_string) {
        List<Integer> nums = new ArrayList<>();
        for (char c : my_string.toCharArray()) {
            if (Character.isDigit(c)) {
                nums.add(c - '0');
            }
        }
        nums.sort(Integer::compareTo);
        return nums.stream().mapToInt(i -> i).toArray();
    }
}
