function solution(n, m, tests) {
  let AL = 0;
  let AR = n + m;
  let BL = -m;
  let BR = n;

  for (let i = 0; i < tests.length; i++) {
    const t = tests[i];
    if (t[3] !== 1) continue;
    const s = t[0] + t[1];
    const q = t[0] - t[1];
    AL = Math.max(AL, s - t[2]);
    AR = Math.min(AR, s + t[2]);
    BL = Math.max(BL, q - t[2]);
    BR = Math.min(BR, q + t[2]);
  }

  if (AL > AR || BL > BR) return 0;

  const rawEvents = [];
  const yCoords = [];

  for (let i = 0; i < tests.length; i++) {
    const [x, y, d, flag] = tests[i];
    if (flag !== 0) continue;

    const s = x + y;
    const q = x - y;

    const lA = Math.max(AL, s - d);
    const rA = Math.min(AR, s + d);
    if (lA > rA) continue;

    const lB = Math.max(BL, q - d);
    const rB = Math.min(BR, q + d);
    if (lB > rB) continue;

    rawEvents.push([lA, 1, lB, rB]);
    rawEvents.push([rA + 1, -1, lB, rB]);
    yCoords.push(lB, rB + 1);
  }

  let hasNeg = rawEvents.length > 0;
  let events = null;

  let cover = null;
  let cntEven = null;
  let cntOdd = null;
  let sumEven = null;
  let sumOdd = null;

  let coords = null;
  let treeUpdate = null;

  let globalL = 0;
  let globalR = -1;
  let leafLast = -1;

  if (hasNeg) {
    yCoords.push(BL, BR + 1);
    yCoords.sort((a, b) => a - b);

    coords = [];
    for (let i = 0; i < yCoords.length; i++) {
      if (i === 0 || yCoords[i] !== yCoords[i - 1]) coords.push(yCoords[i]);
    }

    const M = coords.length;
    if (M <= 1) {
      hasNeg = false;
    } else {
      const leafN = M - 1;
      const SZ = leafN * 4 + 5;

      cover = new Int32Array(SZ);
      cntEven = new Float64Array(SZ);
      cntOdd = new Float64Array(SZ);
      sumEven = new BigInt64Array(SZ);
      sumOdd = new BigInt64Array(SZ);

      const fullCntEven = new Float64Array(SZ);
      const fullCntOdd = new Float64Array(SZ);
      const fullSumEven = new BigInt64Array(SZ);
      const fullSumOdd = new BigInt64Array(SZ);

      const pos = new Map();
      for (let i = 0; i < M; i++) pos.set(coords[i], i);

      events = new Array(rawEvents.length);
      for (let i = 0; i < rawEvents.length; i++) {
        const e = rawEvents[i];
        const l = pos.get(e[2]);
        const r = pos.get(e[3] + 1) - 1;
        events[i] = [e[0], e[1], l, r];
      }
      events.sort((a, b) => a[0] - b[0]);

      function fillFull(node, nl, nr) {
        const L = coords[nl];
        const R = coords[nr + 1] - 1;

        let f0 = (L & 1) === 0 ? L : L + 1;
        if (f0 <= R) {
          const c = ((R - f0) >> 1) + 1;
          fullCntEven[node] = c;
          fullSumEven[node] = BigInt(c) * BigInt(f0 + c - 1);
        }

        let f1 = (L & 1) === 1 ? L : L + 1;
        if (f1 <= R) {
          const c = ((R - f1) >> 1) + 1;
          fullCntOdd[node] = c;
          fullSumOdd[node] = BigInt(c) * BigInt(f1 + c - 1);
        }

        if (nl === nr) return;
        const mid = (nl + nr) >> 1;
        const lc = node << 1;
        fillFull(lc, nl, mid);
        fillFull(lc | 1, mid + 1, nr);
      }

      function pull(node, nl, nr) {
        if (cover[node] > 0) {
          cntEven[node] = fullCntEven[node];
          cntOdd[node] = fullCntOdd[node];
          sumEven[node] = fullSumEven[node];
          sumOdd[node] = fullSumOdd[node];
          return;
        }

        if (nl === nr) {
          cntEven[node] = 0;
          cntOdd[node] = 0;
          sumEven[node] = 0n;
          sumOdd[node] = 0n;
          return;
        }

        const lc = node << 1;
        const rc = lc | 1;
        cntEven[node] = cntEven[lc] + cntEven[rc];
        cntOdd[node] = cntOdd[lc] + cntOdd[rc];
        sumEven[node] = sumEven[lc] + sumEven[rc];
        sumOdd[node] = sumOdd[lc] + sumOdd[rc];
      }

      function update(node, nl, nr, ql, qr, delta) {
        if (qr < nl || nr < ql) return;
        if (ql <= nl && nr <= qr) {
          cover[node] += delta;
          pull(node, nl, nr);
          return;
        }

        const mid = (nl + nr) >> 1;
        const lc = node << 1;
        update(lc, nl, mid, ql, qr, delta);
        update(lc | 1, mid + 1, nr, ql, qr, delta);
        pull(node, nl, nr);
      }

      leafLast = leafN - 1;
      fillFull(1, 0, leafLast);

      treeUpdate = (l, r, delta) => {
        if (l <= r) update(1, 0, leafLast, l, r, delta);
      };

      globalL = coords[0];
      globalR = coords[coords.length - 1] - 1;
    }
  }

  function chooseLowExpr(s) {
    const v1 = BL;
    const v2 = -s;
    const v3 = s - 2 * m;
    if (v1 >= v2 && v1 >= v3) return [0, BL];
    if (v2 >= v1 && v2 >= v3) return [-1, 0];
    return [1, -2 * m];
  }

  function chooseHighExpr(s) {
    const v1 = BR;
    const v2 = s;
    const v3 = 2 * n - s;
    if (v1 <= v2 && v1 <= v3) return [0, BR];
    if (v2 <= v1 && v2 <= v3) return [1, 0];
    return [-1, 2 * n];
  }

  function sumBaseForExpr(L, R, aL, bL, aH, bH) {
    let total = 0n;

    for (let parity = 0; parity <= 1; parity++) {
      const s0 = (L & 1) === parity ? L : L + 1;
      if (s0 > R) continue;

      const k = ((R - s0) >> 1) + 1;
      const hi0 = Math.floor((aH * s0 + bH - parity) / 2);
      const lo0 = Math.floor((aL * s0 + bL - 1 - parity) / 2);
      const delta = aH - aL;

      const kb = BigInt(k);
      total += kb * BigInt(hi0 - lo0) + BigInt(delta) * kb * BigInt(k - 1) / 2n;
    }

    return total;
  }

  let prefCnt = 0;
  let prefSum = 0n;

  function prefixSet(t, parity) {
    if (t < globalL) {
      prefCnt = 0;
      prefSum = 0n;
      return;
    }

    if (t >= globalR) {
      if (parity === 0) {
        prefCnt = cntEven[1];
        prefSum = sumEven[1];
      } else {
        prefCnt = cntOdd[1];
        prefSum = sumOdd[1];
      }
      return;
    }

    let node = 1;
    let nl = 0;
    let nr = leafLast;
    prefCnt = 0;
    prefSum = 0n;

    while (true) {
      const segL = coords[nl];
      const segR = coords[nr + 1] - 1;

      if (t < segL) break;

      if (t >= segR) {
        if (parity === 0) {
          prefCnt += cntEven[node];
          prefSum += sumEven[node];
        } else {
          prefCnt += cntOdd[node];
          prefSum += sumOdd[node];
        }
        break;
      }

      if (cover[node] > 0) {
        const first = (segL & 1) === parity ? segL : segL + 1;
        if (first <= t) {
          const c = ((t - first) >> 1) + 1;
          prefCnt += c;
          prefSum += BigInt(c) * BigInt(first + c - 1);
        }
        break;
      }

      if (nl === nr) break;

      const mid = (nl + nr) >> 1;
      const leftEnd = coords[mid + 1] - 1;
      const lc = node << 1;

      if (t <= leftEnd) {
        node = lc;
        nr = mid;
      } else {
        if (parity === 0) {
          prefCnt += cntEven[lc];
          prefSum += sumEven[lc];
        } else {
          prefCnt += cntOdd[lc];
          prefSum += sumOdd[lc];
        }
        node = lc | 1;
        nl = mid + 1;
      }
    }
  }

  function prefQ(parity, z) {
    const t = 2 * z + parity;
    prefixSet(t, parity);
    const cntB = BigInt(prefCnt);
    const sumQ = (prefSum - BigInt(parity) * cntB) / 2n;
    return (BigInt(z) + 1n) * cntB - sumQ;
  }

  function sumCoveredExpr(L, R, alpha, beta) {
    if (!hasNeg) return 0n;

    let total = 0n;

    for (let parity = 0; parity <= 1; parity++) {
      const s0 = (L & 1) === parity ? L : L + 1;
      if (s0 > R) continue;

      const k = ((R - s0) >> 1) + 1;

      if (alpha === 0) {
        prefixSet(beta, parity);
        total += BigInt(k) * BigInt(prefCnt);
      } else if (alpha === 1) {
        const z0 = Math.floor((s0 + beta - parity) / 2);
        total += prefQ(parity, z0 + k - 1) - prefQ(parity, z0 - 1);
      } else {
        const z0 = Math.floor((-s0 + beta - parity) / 2);
        total += prefQ(parity, z0) - prefQ(parity, z0 - k);
      }
    }

    return total;
  }

  function sumCoveredForExpr(L, R, aL, bL, aH, bH) {
    if (!hasNeg) return 0n;
    return sumCoveredExpr(L, R, aH, bH) - sumCoveredExpr(L, R, aL, bL - 1);
  }

  const cand = [-BL, BL + 2 * m, m, BR, 2 * n - BR, n];
  cand.sort((a, b) => a - b);
  const crit = [];
  for (let i = 0; i < cand.length; i++) {
    const c = cand[i];
    if (c > AL && c < AR + 1) {
      if (crit.length === 0 || crit[crit.length - 1] !== c) crit.push(c);
    }
  }

  const pts = [AL, AR + 1, ...crit];
  pts.sort((a, b) => a - b);
  const uniq = [];
  for (let i = 0; i < pts.length; i++) if (i === 0 || pts[i] !== pts[i - 1]) uniq.push(pts[i]);

  let baseTotal = 0n;
  for (let i = 0; i + 1 < uniq.length; i++) {
    let L = uniq[i], R = uniq[i + 1] - 1;
    if (L > R) continue;

    const probe = L < R ? L + 1 : L;
    const [aL, bL] = chooseLowExpr(probe);
    const [aH, bH] = chooseHighExpr(probe);

    const dA = aL - aH;
    const dB = bL - bH;

    if (dA === 0) {
      if (dB > 0) continue;
    } else if (dA > 0) {
      R = Math.min(R, Math.floor(-dB / dA));
      if (L > R) continue;
    } else {
      L = Math.max(L, Math.ceil(-dB / dA));
      if (L > R) continue;
    }

    baseTotal += sumBaseForExpr(L, R, aL, bL, aH, bH);
  }

  if (!hasNeg) return baseTotal <= 9007199254740991n ? Number(baseTotal) : baseTotal;

  let eidx = 0;
  let cidx = 0;
  let cur = AL;
  let coveredTotal = 0n;

  while (cur <= AR) {
    while (eidx < events.length && events[eidx][0] === cur) {
      const e = events[eidx++];
      treeUpdate(e[2], e[3], e[1]);
    }

    while (cidx < crit.length && crit[cidx] <= cur) cidx++;

    let next = AR + 1;
    if (eidx < events.length && events[eidx][0] < next) next = events[eidx][0];
    if (cidx < crit.length && crit[cidx] < next) next = crit[cidx];

    let L = cur;
    let R = next - 1;

    if (L <= R) {
      const probe = L < R ? L + 1 : L;
      const [aL, bL] = chooseLowExpr(probe);
      const [aH, bH] = chooseHighExpr(probe);

      const dA = aL - aH;
      const dB = bL - bH;

      if (dA === 0) {
        if (dB <= 0 && (cntEven[1] + cntOdd[1] > 0)) {
          coveredTotal += sumCoveredForExpr(L, R, aL, bL, aH, bH);
        }
      } else if (dA > 0) {
        R = Math.min(R, Math.floor(-dB / dA));
        if (L <= R && (cntEven[1] + cntOdd[1] > 0)) {
          coveredTotal += sumCoveredForExpr(L, R, aL, bL, aH, bH);
        }
      } else {
        L = Math.max(L, Math.ceil(-dB / dA));
        if (L <= R && (cntEven[1] + cntOdd[1] > 0)) {
          coveredTotal += sumCoveredForExpr(L, R, aL, bL, aH, bH);
        }
      }
    }

    cur = next;
  }

  const ans = baseTotal - coveredTotal;
  return ans <= 9007199254740991n ? Number(ans) : ans;
}