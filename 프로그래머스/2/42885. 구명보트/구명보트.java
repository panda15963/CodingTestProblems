import java.util.Arrays;

class Solution {
    public int solution(int[] people, int limit) {
        Arrays.sort(people);  // 오름차순 정렬

        int left = 0;
        int right = people.length - 1;
        int boatCount = 0;

        while (left <= right) {
            if (people[left] + people[right] <= limit) {
                // 가벼운 사람 + 무거운 사람 같이 탑승
                left++;
            }
            // 무거운 사람은 무조건 한 번 탐
            right--;
            boatCount++;
        }

        return boatCount;
    }
}