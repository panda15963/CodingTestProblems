class Solution {
    public int solution(int[] arrayA, int[] arrayB) {
        int answer = 0;

        // 1. 각 배열의 최대공약수 구하기
        int gcdA = arrayA[0];
        int gcdB = arrayB[0];
        for (int i = 1; i < arrayA.length; i++) {
            gcdA = gcd(gcdA, arrayA[i]);
            gcdB = gcd(gcdB, arrayB[i]);
        }

        // 2. 조건 검사 및 최댓값 갱신
        if (isValid(arrayB, gcdA)) {
            answer = Math.max(answer, gcdA);
        }
        if (isValid(arrayA, gcdB)) {
            answer = Math.max(answer, gcdB);
        }

        return answer;
    }

    // 유클리드 호제법을 이용한 최대공약수(GCD) 구하기
    private int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    // 배열의 어떤 값도 해당 숫자로 나누어 떨어지지 않는지 확인하는 함수
    private boolean isValid(int[] array, int num) {
        for (int n : array) {
            if (n % num == 0) {
                return false;
            }
        }
        return true;
    }
}
