function solution(n, w, num) {
  let answer = 0;

  // 몇 계층(0.x~1.0)이냐 (계층에 따라 덧셈 규칙이 나뉨)
  let level = Math.floor(num / w);

  // 나눠떨어지는 값은 -1 처리해야 층이 같아짐
  if (num % w === 0) level--;

  const ori_level = level % 2;

  // 계층별 덧셈 규칙값
  const tmp = num + (w - 1) - ((num + (w - 1)) % w);
  const gap = (tmp - num) * 2 + 1;

  // 최종 계산
  for (; num <= n; level++, answer++) {
    if (level % 2 === ori_level) {
      num += gap;
    } else {
      num += (w * 2) - gap;
    }
  }

  return answer;
}