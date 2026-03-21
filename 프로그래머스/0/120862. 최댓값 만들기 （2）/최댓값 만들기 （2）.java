import java.util.Arrays;

class Solution {
    public int solution(int[] numbers) {
        Arrays.sort(numbers);

        int n = numbers.length;
        int max1 = numbers[n - 1] * numbers[n - 2];  // 큰 두 수
        int max2 = numbers[0] * numbers[1];          // 작은 두 수 (음수일 수 있음)

        return Math.max(max1, max2);
    }
}