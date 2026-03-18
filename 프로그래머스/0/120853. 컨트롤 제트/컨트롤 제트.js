function solution(s) {
  const stack = [];
  const tokens = s.split(' ');

  for (const token of tokens) {
    if (token === 'Z') {
      stack.pop();          // 직전에 더했던 숫자 제거
    } else {
      stack.push(Number(token));
    }
  }

  return stack.reduce((acc, v) => acc + v, 0);
}
