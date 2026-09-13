import java.util.PriorityQueue;
import java.util.Collections;

class MedianFinder {
    // max heap: 작은 값들을 저장
    private PriorityQueue<Integer> lower;

    // min heap: 큰 값들을 저장
    private PriorityQueue<Integer> upper;

    public MedianFinder() {
        lower = new PriorityQueue<>(Collections.reverseOrder());
        upper = new PriorityQueue<>();
    }

    public void addNum(int num) {
        if (upper.isEmpty() || upper.peek() < num) {
            upper.offer(num);
        } else {
            lower.offer(num);
        }

        // lower의 크기가 더 크면 upper로 이동
        if (lower.size() > upper.size()) {
            upper.offer(lower.poll());
        }
        // upper가 lower보다 2개 이상 많으면 lower로 이동
        else if (lower.size() + 1 < upper.size()) {
            lower.offer(upper.poll());
        }
    }

    public double findMedian() {
        if (lower.size() < upper.size()) {
            return upper.peek();
        } else {
            return (lower.peek() + upper.peek()) / 2.0;
        }
    }
}