import java.util.HashSet;
import java.util.Set;

class Solution {
    public int solution(int n, int[] lost, int[] reserve) {
        // 1. 도난 + 여벌 겹치는 학생 제거
        Set<Integer> lostSet = new HashSet<>();
        Set<Integer> reserveSet = new HashSet<>();

        for (int l : lost)      lostSet.add(l);
        for (int r : reserve)   reserveSet.add(r);

        // 겹치는 학생은 둘 다 제거 (본인만 입음, 빌려줄 수 없음)
        Set<Integer> temp = new HashSet<>(lostSet);
        for (int l : temp) {
            if (reserveSet.contains(l)) {
                lostSet.remove(l);
                reserveSet.remove(l);
            }
        }

        // 2. 기본 듣는 학생 수
        int answer = n - lostSet.size();

        // 3. lostSet 오름차순 순회 (정렬)
        int[] lostArray = lostSet.stream().mapToInt(i -> i).toArray();
        java.util.Arrays.sort(lostArray);

        for (int student : lostArray) {
            if (reserveSet.contains(student - 1)) {  // 왼쪽 여벌
                reserveSet.remove(student - 1);
                answer++;
            } else if (reserveSet.contains(student + 1)) {  // 오른쪽 여벌
                reserveSet.remove(student + 1);
                answer++;
            }
        }

        return answer;
    }
}