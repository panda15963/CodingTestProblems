function solution(num, k) {
  const s = String(num);
  const idx = s.indexOf(String(k)); // 0-base 인덱스, 없으면 -1

  return idx === -1 ? -1 : idx + 1;
}
