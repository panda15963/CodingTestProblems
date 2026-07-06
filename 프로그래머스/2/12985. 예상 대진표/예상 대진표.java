class Solution
{
    public int solution(int n, int a, int b)
    {
        int answer = 0;

        // 1, 2번은 다음 라운드에는 1번 3, 4번은 다음 라운드에는 2번, 5, 6번은 다음 라운드에는 3번으로..
        // 이러한 규칙은 매 라운드 같기에 1을 더해주고 2로 나눠주면 규칙에 맞게 각 참가자들의 번호를 변경 가능함
        // 이러한 과정을 통해 두 참가자들이 만나게 되는 라운드를 계산
        while(a != b) {
            a = (a + 1) / 2;
            b = (b + 1) / 2;
            answer++;
        }

        return answer;
    }
}