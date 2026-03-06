function solution(arr) {
    let firstTwo = -1;
    let lastTwo = -1;
    
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 2) {
            if (firstTwo === -1) {
                firstTwo = i;
            }
            lastTwo = i;
        }
    }
    
    if (firstTwo === -1) {
        return [-1];
    }
    
    return arr.slice(firstTwo, lastTwo + 1);
}
