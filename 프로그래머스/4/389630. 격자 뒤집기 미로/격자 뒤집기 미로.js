function solution(visible, hidden, k) {
  const n = visible.length;
  const m = visible[0].length;

  // 1) baseSum = sum of all visible[i][j]
  let baseSum = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      baseSum += visible[i][j];
    }
  }

  // 2) D[i][j] = hidden[i][j] - visible[i][j], sumDcol[j] = sum_i D[i][j]
  const D = Array.from({ length: n }, () => Array(m));
  const sumDcol = Array(m).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      D[i][j] = hidden[i][j] - visible[i][j];
      sumDcol[j] += D[i][j];
    }
  }

  // 짝수×짝수 그리드인지 여부
  const needDrop = (n % 2 === 0 && m % 2 === 0);
  let answer = -Infinity;

  // 행 뒤집기 조합 전수조사 (2^n)
  const FULL = 1 << n;
  for (let mask = 0; mask < FULL; mask++) {
    // 뒤집힌 행 개수
    let rowsFlipped = 0;
    for (let t = mask; t; t &= t - 1) rowsFlipped++;

    // 각 열에 대해 최적 이득 계산
    let colGain = 0;
    let colsFlipped = 0;
    const C = new Uint8Array(m); // 이 열을 뒤집었는지 표시

    for (let j = 0; j < m; j++) {
      // f0 = mask 행들이 뒤집혔을 때 D 합, f1 = 전체 - f0
      let f0 = 0;
      for (let i = 0; i < n; i++) {
        if ((mask >> i) & 1) f0 += D[i][j];
      }
      const f1 = sumDcol[j] - f0;

      // 열 뒤집기 vs 비뒤집기 비교
      if (f1 - k > f0) {
        C[j] = 1;
        colsFlipped++;
        colGain += f1;
      } else {
        C[j] = 0;
        colGain += f0;
      }
    }

    // 누적 점수 = baseSum + colGain − k*(rowsFlipped + colsFlipped)
    let total = baseSum + colGain - k * (rowsFlipped + colsFlipped);

    // 짝수×짝수인 경우, 반대 패리티 칸 중 최소값 하나를 빼 줌
    if (needDrop) {
      let minVal = Infinity;
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
          // 시작(0,0)과 끝(n-1,m-1) 제외
          if ((i === 0 && j === 0) || (i === n - 1 && j === m - 1)) continue;
          // 0-index 패리티: (0,0)에서 시작 → 반대 패리티는 (i+j)%2 === 1
          if (((i + j) & 1) !== 1) continue;

          // 최종 보이는 값
          const flipped = (((mask >> i) & 1) ^ C[j]) === 1;
          const val = flipped ? hidden[i][j] : visible[i][j];
          if (val < minVal) minVal = val;
        }
      }
      total -= minVal;
    }

    if (total > answer) answer = total;
  }

  return answer;
}