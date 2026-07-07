class Solution {
    public int solution(int[] sticker) {
        int size = sticker.length;

        if (size == 1) {
            return sticker[0];
        }

        // 첫 번째 스티커를 뜯는 경우
        int[] first = new int[size];

        // 첫 번째 스티커를 뜯지 않는 경우
        int[] second = new int[size];

        first[0] = sticker[0];
        first[1] = sticker[0];

        second[0] = 0;
        second[1] = sticker[1];

        for (int i = 2; i < size; i++) {
            // 첫 번째 스티커를 선택했으므로 마지막 스티커는 선택 불가
            if (i != size - 1) {
                first[i] = Math.max(first[i - 2] + sticker[i], first[i - 1]);
            }

            // 첫 번째 스티커를 선택하지 않은 경우
            second[i] = Math.max(second[i - 2] + sticker[i], second[i - 1]);
        }

        return Math.max(first[size - 2], second[size - 1]);
    }
}