class Solution {
    public int[] solution(int[] arr) {
        int length = 1;
        // 배열 길이보다 크거나 같은 최소의 2의 거듭제곱 구하기
        while (length < arr.length) {
            length *= 2;
        }
        
        // 원본 배열 복사 및 모자란 부분 0으로 채우기
        int[] result = new int[length];
        for (int i = 0; i < arr.length; i++) {
            result[i] = arr[i];
        }
        
        return result;
    }
}
