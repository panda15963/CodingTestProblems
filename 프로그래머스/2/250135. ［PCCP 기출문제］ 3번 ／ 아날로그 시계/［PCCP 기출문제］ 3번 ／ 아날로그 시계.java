import java.util.*;
class Solution {
       public int solution(int h1, int m1, int s1, int h2, int m2, int s2) {
        int answer = -1;

        // 시작과 끝의 시간을 초단위로 바꾼다.
        int startSec = parseToSec(h1, m1, s1);
        int endSec = parseToSec(h2, m2, s2);

        // 0시0분0초부터 끝나는 시간까지의 울림 횟수 - 0시0분0초로부터 시작 시간까지의 울림 횟수를 뺀다.
        answer = countAlrams(endSec) - countAlrams(startSec);
        answer += alramNow(startSec) ? 1 : 0;

        return answer;
    }

    private int parseToSec(int hour, int minute, int second) {
        return hour * 60 * 60 + minute * 60 + second;
    }

    private int countAlrams(int seconds) {
        // 분침이 초침과 만나는 회수 계산(분침이 1바퀴 도는 동안 초침은 60회를 돌지만 59를 곱하는 이유는 59분->00분가 될때 분침이 앞으로 이동해버려 초침과 만나지 않는다.)
        int minuteAlrams = seconds * 59 / (60*60);
        // 시침이 초침과 만나는 회수 계산(시침이 1바퀴를 도는 동안 초침은 720(12*60)회를 돌지만 719를 곱하는 이유는 12시->1시가 될때 시침이 앞으로 이동해버려 초침과 만나지 않는다.)
        int hourAlrams = seconds * 719 / (12*60*60);

        // 0시0분0초에서 시작한다고 가정했으니 무조건 1번은 제외, 만약에 12시 0분 0초 보다 크다면 12시0분0초를 지났으므로 2번 제외해준다.
        int duplicatedAlrams = (12*60*60) <= seconds ? 2 : 1;

        // 0시0분0초부터 seconds까지 초침이 분/시침과 만난 횟수
        return minuteAlrams + hourAlrams - duplicatedAlrams;
    }

    private boolean alramNow(int seconds) {
        // duplicatedAlrams에서 00시거나 12시인 경우를 모두 뺐으니 만약에 시작이 0시0분0초이거나 12시0분0초이면 +1
        return seconds == 0 || seconds == 43200;
    }
}