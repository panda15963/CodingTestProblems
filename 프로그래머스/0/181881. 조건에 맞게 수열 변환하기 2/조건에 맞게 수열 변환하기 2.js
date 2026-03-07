function solution(arr) {
    let x = 0;
    
    while (true) {
        let changed = false;
        
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] >= 50 && arr[i] % 2 === 0) {
                arr[i] = Math.floor(arr[i] / 2);
                changed = true;
            } else if (arr[i] < 50 && arr[i] % 2 === 1) {
                arr[i] = arr[i] * 2 + 1;
                changed = true;
            }
        }
        
        if (!changed) return x;
        x++;
    }
}
