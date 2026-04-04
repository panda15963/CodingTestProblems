function solution(players, m, k) {
  let answer = 0;
  let server = Array(24).fill(0); // 시간대별 서버 개수

  for (let i = 0; i < 24; i++) {
    if (Math.floor(players[i] / m) > server[i]) {
      const adding = Math.floor(players[i] / m) - server[i];
      answer += adding;

      for (let j = i; j < i + k; j++) {
        if (j < 24) server[j] += adding;
      }
    }
  }

  return answer;
}