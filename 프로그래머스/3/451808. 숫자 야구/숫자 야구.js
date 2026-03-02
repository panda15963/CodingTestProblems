// n: 최대 시도 횟수, submit: (number) => "xS yB"
function solution(n, submit) {
  // 후보 생성: 1~9 서로 다른 4자리
  let candidates = [];
  for (let a = 1; a <= 9; a++) {
    for (let b = 1; b <= 9; b++) if (b !== a) {
      for (let c = 1; c <= 9; c++) if (c !== a && c !== b) {
        for (let d = 1; d <= 9; d++) if (d !== a && d !== b && d !== c) {
          candidates.push([a, b, c, d]);
        }
      }
    }
  }

  const score = (guess, secret) => {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < 4; i++) {
      if (guess[i] === secret[i]) strike++;
      else {
        for (let j = 0; j < 4; j++) {
          if (i !== j && guess[i] === secret[j]) {
            ball++;
            break;
          }
        }
      }
    }
    return [strike, ball];
  };

  const parseHint = (hint) => {
    const [xs, yb] = hint.split(" ");
    return [parseInt(xs, 10), parseInt(yb, 10)];
  };

  const toNumber = (arr) =>
    arr[0] * 1000 + arr[1] * 100 + arr[2] * 10 + arr[3];

  const pickGuess = () => {
    if (candidates.length <= 2) return candidates[0];

    let best = candidates[0];
    let bestWorst = Infinity;

    // 필요하면 여기서 전체 공간(3024)로 pool을 확장해도 됨
    const pool = candidates;

    for (const g of pool) {
      const buckets = new Map(); // "s,b" -> count
      for (const s of candidates) {
        const [st, ba] = score(g, s);
        const key = st + "," + ba;
        buckets.set(key, (buckets.get(key) || 0) + 1);
      }
      let worst = 0;
      for (const cnt of buckets.values()) {
        if (cnt > worst) worst = cnt;
      }
      if (worst < bestWorst) {
        bestWorst = worst;
        best = g;
      }
    }
    return best;
  };

  for (let t = 0; t < n; t++) {
    const guessArr = candidates.length === 1 ? candidates[0] : pickGuess();
    const guessNum = toNumber(guessArr);
    const hint = submit(guessNum);
    const [st, ba] = parseHint(hint);

    if (st === 4) return guessNum;

    candidates = candidates.filter((s) => {
      const [sst, sba] = score(guessArr, s);
      return sst === st && sba === ba;
    });
  }

  // 이론상 도달 X (n이 충분하다고 가정)
  return toNumber(candidates[0]);
}

module.exports = solution;
