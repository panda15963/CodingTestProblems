import java.util.*;

class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] result = new int[n - k + 1];

        // 인덱스를 저장하는 Deque
        Deque<Integer> deque = new ArrayDeque<>();

        for (int i = 0; i < n; i++) {

            // 현재 값보다 작은 값의 인덱스 제거
            while (!deque.isEmpty() &&
                   nums[deque.peekLast()] < nums[i]) {
                deque.pollLast();
            }

            deque.offerLast(i);

            // 현재 윈도우 범위를 벗어난 인덱스 제거
            if (deque.peekFirst() <= i - k) {
                deque.pollFirst();
            }

            // 윈도우가 완성되면 최댓값 저장
            if (i >= k - 1) {
                result[i - k + 1] = nums[deque.peekFirst()];
            }
        }

        return result;
    }
}