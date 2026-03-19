class Solution {
    public int solution(int n) {
        double root = Math.sqrt(n);
        if (root == (int) root) {
            return 1;
        } else {
            return 2;
        }
    }
}
