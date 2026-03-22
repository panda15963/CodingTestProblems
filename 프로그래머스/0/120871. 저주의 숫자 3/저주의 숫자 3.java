class Solution {
    public int solution(int n) {
        int count = 0;
        int num = 0;

        while (count < n) {
            num++;

            // 조건 체크
            if (num % 3 != 0 && !String.valueOf(num).contains("3")) {
                count++;
            }
        }

        return num;
    }
}