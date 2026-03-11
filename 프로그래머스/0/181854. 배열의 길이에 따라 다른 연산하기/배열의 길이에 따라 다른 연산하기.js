function solution(arr, n) {
  // 배열 길이가 홀수면 짝수 인덱스에 n 더함, 짝수면 홀수 인덱스에 n 더함
  return arr.map((num, idx) => {
    if (arr.length % 2 !== 0) {
      return idx % 2 === 0 ? num + n : num; // 홀수 길이 -> 짝수 인덱스
    } else {
      return idx % 2 !== 0 ? num + n : num; // 짝수 길이 -> 홀수 인덱스
    }
  });
}
