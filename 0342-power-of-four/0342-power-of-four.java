class Solution {
    public boolean isPowerOfFour(int n) {
        // n이 0보다 크고, 2의 거듭제곱이며, 1이 홀수 번째 자리에 있는 경우
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
    }
}
