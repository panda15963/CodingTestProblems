class Solution {
    public double myPow(double x, int n) {
        if (n == 0 || x == 1.0) {
            return 1.0;
        }

        if (n == 1) {
            return x;
        }

        long exponent = n;
        boolean negative = false;

        if (exponent < 0) {
            negative = true;
            exponent = -exponent;
        }

        double result = 1.0;

        while (exponent > 0) {
            if ((exponent & 1) == 1) {
                result *= x;
            }

            x *= x;
            exponent >>= 1;
        }

        return negative ? 1.0 / result : result;
    }
}