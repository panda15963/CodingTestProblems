class Solution {
    public long[] solution(long[] numbers) {
        long[] answer = new long[numbers.length];

        for (int i = 0; i < numbers.length; i++) {
            long num = numbers[i];

            // 짝수인 경우
            if (num % 2 == 0) {
                answer[i] = num + 1;
                continue;
            }

            long rightmostZero = (num + 1) & (~num);
            long nextOne = rightmostZero >> 1;

            answer[i] = num ^ rightmostZero ^ nextOne;
        }

        return answer;
    }
}