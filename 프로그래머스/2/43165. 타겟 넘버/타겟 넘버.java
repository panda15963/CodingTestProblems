class Solution {
    int answer = 0;

    public int solution(int[] numbers, int target) {
        dfs(numbers, target, 0, 0);
        return answer;
    }

    private void dfs(int[] numbers, int target, int index, int sum) {
        if (index == numbers.length) {
            if (sum == target) {
                answer++;
            }
            return;
        }

        // + 선택
        dfs(numbers, target, index + 1, sum + numbers[index]);

        // - 선택
        dfs(numbers, target, index + 1, sum - numbers[index]);
    }
}