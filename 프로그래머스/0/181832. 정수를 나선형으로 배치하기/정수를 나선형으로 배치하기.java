class Solution {
    public int[][] solution(int n) {
        int[][] arr = new int[n][n];
        int num = 1;
        int left = 0, right = n;
        int top = 0, bottom = n;
        
        while (left < right && top < bottom) {
            // 상단
            for (int j = left; j < right; j++) arr[top][j] = num++;
            top++;
            
            // 우측
            for (int i = top; i < bottom; i++) arr[i][right-1] = num++;
            right--;
            
            // 하단
            if (top < bottom)
                for (int j = right-1; j >= left; j--) arr[bottom-1][j] = num++;
            bottom--;
            
            // 좌측
            if (left < right)
                for (int i = bottom-1; i >= top; i--) arr[i][left] = num++;
            left++;
        }
        return arr;
    }
}
