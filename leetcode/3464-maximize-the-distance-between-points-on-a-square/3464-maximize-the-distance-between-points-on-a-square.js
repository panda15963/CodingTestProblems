/**
 * @param {number} side
 * @param {number[][]} points
 * @param {number} k
 * @return {number}
 */
var maxDistance = function(side, points, k) {
  const ordered = getOrderedPoints(side, points);
  let l = 0;
  let r = side;

  while (l < r) {
    const m = Math.floor((l + r + 1) / 2);
    if (isValidDistance(ordered, k, m)) {
      l = m;
    } else {
      r = m - 1;
    }
  }

  return l;
};

function isValidDistance(ordered, k, d) {
  const dq = [{
    startX: ordered[0][0],
    startY: ordered[0][1],
    endX: ordered[0][0],
    endY: ordered[0][1],
    length: 1,
  }];

  let maxLength = 1;

  for (let i = 1; i < ordered.length; i++) {
    const x = ordered[i][0];
    const y = ordered[i][1];
    let startX = x;
    let startY = y;
    let length = 1;

    while (
      dq.length > 0 &&
      Math.abs(x - dq[0].endX) + Math.abs(y - dq[0].endY) >= d
    ) {
      if (
        Math.abs(x - dq[0].startX) + Math.abs(y - dq[0].startY) >= d &&
        dq[0].length + 1 >= length
      ) {
        startX = dq[0].startX;
        startY = dq[0].startY;
        length = dq[0].length + 1;
        maxLength = Math.max(maxLength, length);
      }
      dq.shift();
    }

    dq.push({
      startX,
      startY,
      endX: x,
      endY: y,
      length,
    });
  }

  return maxLength >= k;
}

function getOrderedPoints(side, points) {
  const left = [];
  const top = [];
  const right = [];
  const bottom = [];

  for (const point of points) {
    const x = point[0];
    const y = point[1];

    if (x === 0 && y > 0) {
      left.push(point);
    } else if (x > 0 && y === side) {
      top.push(point);
    } else if (x === side && y < side) {
      right.push(point);
    } else {
      bottom.push(point);
    }
  }

  left.sort((a, b) => a[1] - b[1]);
  top.sort((a, b) => a[0] - b[0]);
  right.sort((a, b) => b[1] - a[1]);
  bottom.sort((a, b) => b[0] - a[0]);

  return [...left, ...top, ...right, ...bottom];
}