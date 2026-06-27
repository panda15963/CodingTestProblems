import java.util.*;

class Solution {
    public int solution(int bridge_length, int weight, int[] truck_weights) {
        Queue<Integer> bridge = new LinkedList<>();

        // 다리 초기화
        for (int i = 0; i < bridge_length; i++) {
            bridge.offer(0);
        }

        int time = 0;
        int currentWeight = 0;
        int index = 0;

        while (!bridge.isEmpty()) {
            time++;

            // 다리에서 트럭(또는 빈칸) 하나 빠짐
            currentWeight -= bridge.poll();

            // 아직 대기 중인 트럭이 있다면
            if (index < truck_weights.length) {
                if (currentWeight + truck_weights[index] <= weight) {
                    bridge.offer(truck_weights[index]);
                    currentWeight += truck_weights[index];
                    index++;
                } else {
                    bridge.offer(0);
                }
            }

            // 모든 트럭이 다리를 건넜으면 종료
            if (index == truck_weights.length && currentWeight == 0) {
                break;
            }
        }

        return time;
    }
}