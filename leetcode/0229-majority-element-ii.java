import java.util.*;

class Solution {
    public List<Integer> majorityElement(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();

        // 각 숫자의 등장 횟수 계산
        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }

        List<Integer> result = new ArrayList<>();

        // 배열 길이의 1/3보다 많이 등장한 숫자 찾기
        for (int num : map.keySet()) {
            if (map.get(num) > nums.length / 3) {
                result.add(num);
            }
        }

        return result;
    }
}