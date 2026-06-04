function solution(arr, flag) {
    let X = [];
    
    for (let i = 0; i < flag.length; i++) {
        if (flag[i]) {
            // true일 때: arr[i] 값을 arr[i] * 2 번 만큼 배열에 추가
            X.push(...Array(arr[i] * 2).fill(arr[i]));
        } else {
            // false일 때: 배열의 마지막에서 arr[i] 개 만큼의 원소를 제거
            X.splice(-arr[i]);
        }
    }
    return X;
}
