class Solution {
    public long solution(int n, long l, long r) {
        return countOnes(n, l - 1, r - 1);
    }

    private long countOnes(int n, long l, long r) {
        if (n == 0) return 1;

        long prevLen = (long) Math.pow(5, n - 1);
        long count = 0;

        for (int i = 0; i < 5; i++) {
            // 현재 5등분 구간이 범위(l~r)에 포함되지 않으면 건너뜀
            if (r < i * prevLen || l >= (i + 1) * prevLen) continue;

            if (i == 2) { // 3번째 구간은 무조건 "00000"
                continue;
            } else {
                // 재귀적으로 1의 개수 카운트
                count += countOnes(n - 1, Math.max(0, l - i * prevLen), Math.min(prevLen - 1, r - i * prevLen));
            }
        }
        return count;
    }
}
