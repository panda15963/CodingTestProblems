function solution(n) {
    const arr = Array(n).fill().map(() => Array(n).fill(0));
    let num = 1, left = 0, right = n, top = 0, bottom = n;
    
    while (left < right && top < bottom) {
        // 상단
        for (let j = left; j < right; j++) arr[top][j] = num++;
        top++;
        
        // 우측
        for (let i = top; i < bottom; i++) arr[i][right-1] = num++;
        right--;
        
        // 하단
        if (top < bottom)
            for (let j = right-1; j >= left; j--) arr[bottom-1][j] = num++;
        bottom--;
        
        // 좌측
        if (left < right)
            for (let i = bottom-1; i >= top; i--) arr[i][left] = num++;
        left++;
    }
    return arr;
}
