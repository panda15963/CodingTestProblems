class Solution {
    public int[] solution(String[] wallpaper) {
        // 왼쪽 상단 x의 초기 값
        int lux = wallpaper.length;
        // 왼쪽 상단 y의 초기 값
        int luy = wallpaper[0].length();
        // 오른쪽 하단 x의 초기 값
        int rdx = 0;
        // 오른쪽 하단 y의 초기 값
        int rdy = 0;

        // 바탕화면 wallpaper 배열을 순회하면서 '#'인 부분의 좌표를 찾음
        for (int i = 0; i < wallpaper.length; i++) {
            for (int j = 0; j < wallpaper[i].length(); j++) {
                if (wallpaper[i].charAt(j) == '#') {
                    // 왼쪽 상단 좌표(lux, luy)는 현재 좌표와 비교하여 최솟값을 저장
                    lux = Math.min(lux, i);
                    luy = Math.min(luy, j);
                    // 오른쪽 하단좌표(rdx, rdy)는 현재 좌표 + 1과 비교하여 최댓값을 저장
                    rdx = Math.max(rdx, i + 1);
                    rdy = Math.max(rdy, j + 1);
                }
            }
        }

        return new int[]{lux, luy, rdx, rdy};
    }
}