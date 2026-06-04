function solution(arr, k) {
    // 1. 중복 제거
    const uniqueArr = [...new Set(arr)];
    
    // 2. 길이에 따라 k개만큼 자르거나 -1로 채우기
    if (uniqueArr.length < k) {
        return [...uniqueArr, ...new Array(k - uniqueArr.length).fill(-1)];
    } else {
        return uniqueArr.slice(0, k);
    }
}
