class Solution {
    public int solution(int[] arr) {
        int[] copy = arr.clone();
        int x = 0;
        
        while (true) {
            transform(arr);  // 변환
            
            // 현재 배열과 이전 배열 비교
            boolean same = true;
            for (int i = 0; i < arr.length; i++) {
                if (arr[i] != copy[i]) {
                    same = false;
                    break;
                }
            }
            
            if (same) return x;
            
            // 배열 복사
            System.arraycopy(arr, 0, copy, 0, arr.length);
            x++;
        }
    }
    
    private void transform(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] >= 50 && arr[i] % 2 == 0) {
                arr[i] /= 2;
            } else if (arr[i] < 50 && arr[i] % 2 == 1) {
                arr[i] = arr[i] * 2 + 1;
            }
        }
    }
}
