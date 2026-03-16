class Solution {
    public int solution(int n) {
        int i = 1;
        long fact = 1;
        while (fact * i <= n) {
            fact *= i;
            i++;
        }
        return i - 1;
    }
}
