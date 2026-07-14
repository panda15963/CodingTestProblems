import java.util.*;

class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        List<Integer> tmpList = new ArrayList<>();

        ListNode current = head;

        // 연결 리스트의 값을 배열에 저장
        while (current != null) {
            tmpList.add(current.val);
            current = current.next;
        }

        // k보다 노드 개수가 적으면 원본 반환
        if (tmpList.size() < k) {
            return head;
        }

        // k개 단위 그룹 개수
        int loopSeq = tmpList.size() / k;

        List<Integer> emptyList = new ArrayList<>();

        // k개 단위로 뒤집기
        for (int seq = 0; seq < loopSeq; seq++) {
            int point = k - 1;

            while (point >= 0) {
                emptyList.add(tmpList.get(seq * k + point));
                point--;
            }
        }

        // k개 미만으로 남은 원소 추가
        int checkNum = loopSeq * k;

        while (checkNum < tmpList.size()) {
            emptyList.add(tmpList.get(checkNum));
            checkNum++;
        }

        // 새로운 연결 리스트 생성
        ListNode finalHead = null;

        for (int i = emptyList.size() - 1; i >= 0; i--) {
            finalHead = new ListNode(emptyList.get(i), finalHead);
        }

        return finalHead;
    }
}