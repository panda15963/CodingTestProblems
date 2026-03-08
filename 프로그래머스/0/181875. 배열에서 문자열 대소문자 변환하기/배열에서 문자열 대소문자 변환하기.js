function solution(strArr) {
  return strArr.map((s, i) =>
    i % 2 === 0 ? s.toLowerCase() : s.toUpperCase()
  );
}
