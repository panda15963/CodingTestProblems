function solution(array, n) {
  return array.reduce((acc, cur) => {
    const accDiff = Math.abs(n - acc);
    const curDiff = Math.abs(n - cur);
    return curDiff < accDiff || (curDiff === accDiff && cur < acc) ? cur : acc;
  });
}
