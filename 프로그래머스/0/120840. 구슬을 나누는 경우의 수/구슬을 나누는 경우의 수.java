class Solution {
    public int solution(int balls, int share) {
        long result = 1;
        for (int i = 1; i <= share; i++) {
            result *= (balls - i + 1);
            result /= i;
        }
        return (int) result;
    }
}
