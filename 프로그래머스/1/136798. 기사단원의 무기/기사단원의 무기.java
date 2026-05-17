class Solution {
    public int solution(int number, int limit, int power) {
        int answer = 0;
        
        for (int i = 1; i <= number; i++) {
            int count = getDivisorCount(i);
            
            // 제한 수치를 초과하면 power로 대체
            if (count > limit) {
                answer += power;
            } else {
                answer += count;
            }
        }
        
        return answer;
    }

    // 약수의 개수를 구하는 함수 (제곱근 활용)
    private int getDivisorCount(int n) {
        int count = 0;
        for (int i = 1; i * i <= n; i++) {
            if (i * i == n) {
                count++; // 제곱근인 경우 (나누어 떨어지는 수가 중복될 때)
            } else if (n % i == 0) {
                count += 2; // 나누어 떨어지는 수의 짝꿍(앞뒤)을 함께 카운트
            }
        }
        return count;
    }
}
