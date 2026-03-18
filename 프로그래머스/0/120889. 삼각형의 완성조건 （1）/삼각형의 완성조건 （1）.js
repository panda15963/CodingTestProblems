function solution(sides) {
  const max = Math.max(...sides);
  const sum = sides.reduce((a, b) => a + b) - max;
  return sum > max ? 1 : 2;
}
