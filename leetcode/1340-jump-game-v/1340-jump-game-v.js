function maxJumps(arr, d) {
  const n = arr.length;
  const memo = new Array(n).fill(null);

  function dfs(i) {
    if (memo[i] !== null) return memo[i];

    let max = 1;

    // left
    for (let j = i - 1; j >= 0; j--) {
      if (i - j > d || arr[j] >= arr[i]) break;
      max = Math.max(max, 1 + dfs(j));
    }

    // right
    for (let j = i + 1; j < n; j++) {
      if (j - i > d || arr[j] >= arr[i]) break;
      max = Math.max(max, 1 + dfs(j));
    }

    memo[i] = max;
    return max;
  }

  let result = 1;
  for (let i = 0; i < n; i++) {
    result = Math.max(result, dfs(i));
  }

  return result;
}