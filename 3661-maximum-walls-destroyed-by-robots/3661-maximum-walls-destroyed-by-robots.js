/**
 * @param {number[]} robots
 * @param {number[]} distance
 * @param {number[]} walls
 * @return {number}
 */
var maxWalls = function(robots, distance, walls) {
  const n = robots.length;
  const robotsInfo = robots.map((p, i) => [p, distance[i]]).sort((a, b) => a[0] - b[0]);
  walls.sort((a, b) => a - b);

  const memo = Array.from({ length: n }, () => Array(2).fill(-1));

  function lowerBound(arr, target) {
    let l = 0, r = arr.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (arr[m] < target) l = m + 1;
      else r = m;
    }
    return l;
  }

  function countWalls(l, r) {
    if (l > r) return 0;
    return lowerBound(walls, r + 1) - lowerBound(walls, l);
  }

  function dfs(i, prevDir) {
    if (i < 0) return 0;
    if (memo[i][prevDir] !== -1) return memo[i][prevDir];

    const [pos, dist] = robotsInfo[i];

    let leftL = pos - dist;
    if (i > 0) leftL = Math.max(leftL, robotsInfo[i - 1][0] + 1);
    const leftCnt = countWalls(leftL, pos);

    let rightR = pos + dist;
    if (i + 1 < n) {
      if (prevDir === 0) {
        rightR = Math.min(rightR, robotsInfo[i + 1][0] - robotsInfo[i + 1][1] - 1);
      } else {
        rightR = Math.min(rightR, robotsInfo[i + 1][0] - 1);
      }
    }
    const rightCnt = countWalls(pos, rightR);

    memo[i][prevDir] = Math.max(
      dfs(i - 1, 0) + leftCnt,
      dfs(i - 1, 1) + rightCnt
    );
    return memo[i][prevDir];
  }

  return dfs(n - 1, 1);
};