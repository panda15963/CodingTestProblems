function solution(values, edges, queries) {
  const n = values.length;
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }

  // ---------- 1) Tree preprocessing (parent/size/heavy + HLD) ----------
  const parent = new Int32Array(n + 1);
  const depth = new Int32Array(n + 1);
  const size = new Int32Array(n + 1);
  const heavy = new Int32Array(n + 1);

  const order = new Int32Array(n);
  let ordN = 0;
  const st = [1];
  parent[1] = 0;
  depth[1] = 0;

  while (st.length) {
    const u = st.pop();
    order[ordN++] = u;
    const g = adj[u];
    for (let i = 0; i < g.length; i++) {
      const v = g[i];
      if (v === parent[u]) continue;
      parent[v] = u;
      depth[v] = depth[u] + 1;
      st.push(v);
    }
  }

  for (let i = ordN - 1; i >= 0; i--) {
    const u = order[i];
    let sz = 1;
    let h = 0;
    let best = 0;
    const g = adj[u];
    for (let j = 0; j < g.length; j++) {
      const v = g[j];
      if (v === parent[u]) continue;
      sz += size[v];
      if (size[v] > best) {
        best = size[v];
        h = v;
      }
    }
    size[u] = sz;
    heavy[u] = h;
  }

  const head = new Int32Array(n + 1);
  const tin = new Int32Array(n + 1);
  const tout = new Int32Array(n + 1);
  const inv = new Int32Array(n + 1);

  let timer = 0;
  const stNode = [1];
  const stHead = [1];

  // heavy-first preorder
  while (stNode.length) {
    let u = stNode.pop();
    const h = stHead.pop();

    while (u !== 0) {
      head[u] = h;
      tin[u] = ++timer;
      inv[timer] = u;

      const hu = heavy[u];
      const g = adj[u];
      for (let i = 0; i < g.length; i++) {
        const v = g[i];
        if (v === parent[u] || v === hu) continue;
        stNode.push(v);
        stHead.push(v);
      }

      u = hu;
    }
  }

  for (let u = 1; u <= n; u++) {
    tout[u] = tin[u] + size[u] - 1;
  }

  // ---------- 2) Implicit Treap (array by tin order) ----------
  const MAX = n + 5;
  const L = new Int32Array(MAX);
  const R = new Int32Array(MAX);
  const SZ = new Int32Array(MAX);
  const PR = new Uint32Array(MAX);
  const VAL = new Float64Array(MAX);
  const SUM = new Float64Array(MAX);

  let seed = 123456789;
  function rnd() {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return seed >>> 0;
  }

  function pull(t) {
    SZ[t] = 1 + SZ[L[t]] + SZ[R[t]];
    SUM[t] = VAL[t] + SUM[L[t]] + SUM[R[t]];
  }

  function merge(a, b) {
    if (a === 0) return b;
    if (b === 0) return a;
    if (PR[a] < PR[b]) {
      R[a] = merge(R[a], b);
      pull(a);
      return a;
    } else {
      L[b] = merge(a, L[b]);
      pull(b);
      return b;
    }
  }

  function split(t, k) {
    // first k nodes / rest
    if (t === 0) return [0, 0];
    if (SZ[L[t]] >= k) {
      const [a, b] = split(L[t], k);
      L[t] = b;
      pull(t);
      return [a, t];
    } else {
      const [a, b] = split(R[t], k - SZ[L[t]] - 1);
      R[t] = a;
      pull(t);
      return [t, b];
    }
  }

  function popRight(t) {
    // remove rightmost node from tree t
    if (R[t] === 0) {
      const rem = L[t];
      L[t] = 0;
      pull(t);
      return [rem, t];
    }
    const [nr, last] = popRight(R[t]);
    R[t] = nr;
    pull(t);
    return [t, last];
  }

  function setLeftmost(t, x) {
    if (L[t] === 0) {
      VAL[t] = x;
      pull(t);
      return t;
    }
    L[t] = setLeftmost(L[t], x);
    pull(t);
    return t;
  }

  let root = 0;

  // Build sequence by tin: position pos's value = node inv[pos]'s current value
  for (let pos = 1; pos <= n; pos++) {
    const node = inv[pos];
    const id = pos;
    VAL[id] = values[node - 1];
    SUM[id] = VAL[id];
    SZ[id] = 1;
    PR[id] = rnd();
    L[id] = 0;
    R[id] = 0;
    root = merge(root, id);
  }

  function rangeSum(l, r) {
    let a, b, m, c;
    [a, b] = split(root, l - 1);
    [m, c] = split(b, r - l + 1);
    const ans = SUM[m];
    root = merge(a, merge(m, c));
    return ans;
  }

  // a[l..r] <- [x, old a[l], ..., old a[r-1]], return old a[r]
  function shiftRange(l, r, x) {
    let a, b, m, c;
    [a, b] = split(root, l - 1);
    [m, c] = split(b, r - l + 1);

    let old;
    if (l === r) {
      old = VAL[m];
      VAL[m] = x;
      pull(m);
      root = merge(a, merge(m, c));
      return old;
    }

    let m1, last;
    [m1, last] = popRight(m); // old a[r]
    old = VAL[last];

    let rotated = merge(last, m1);  // right rotate by 1
    rotated = setLeftmost(rotated, x);

    root = merge(a, merge(rotated, c));
    return old;
  }

  // ---------- 3) Process queries ----------
  const answer = [];

  for (const [u, w] of queries) {
    if (w === -1) {
      answer.push(rangeSum(tin[u], tout[u]));
      continue;
    }

    // root -> u path = multiple chain-prefix ranges
    // collect bottom-up then process reverse(top-down)
    const segL = [];
    const segR = [];

    let x = u;
    while (head[x] !== 1) {
      segL.push(tin[head[x]]);
      segR.push(tin[x]);
      x = parent[head[x]];
    }
    segL.push(tin[1]);
    segR.push(tin[x]);

    let carry = w;
    for (let i = segL.length - 1; i >= 0; i--) {
      carry = shiftRange(segL[i], segR[i], carry);
    }
  }

  return answer;
}