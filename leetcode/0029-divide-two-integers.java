class Solution {
    public int divide(int dividend, int divisor) {
        // 오버플로우 예외 처리
        if (dividend == Integer.MIN_VALUE && divisor == -1) {
            return Integer.MAX_VALUE;
        }

        int multiplier = 1;

        // Integer.MIN_VALUE의 절댓값을 처리하기 위해 long 사용
        long dividendLong = dividend;
        long divisorLong = divisor;

        if (dividendLong < 0) {
            dividendLong = -dividendLong;
            multiplier = -multiplier;
        }

        if (divisorLong < 0) {
            divisorLong = -divisorLong;
            multiplier = -multiplier;
        }

        long left = dividendLong;
        long quotient = 0;

        while (left >= divisorLong) {
            long temporalQuotient = 1;
            long currentNumber = divisorLong;

            while (true) {
                long nextNumber = currentNumber << 1;

                if (nextNumber <= left) {
                    temporalQuotient <<= 1;
                    currentNumber = nextNumber;
                } else {
                    left -= currentNumber;
                    quotient += temporalQuotient;
                    break;
                }
            }
        }

        return (int) (quotient * multiplier);
    }
}