function solution(heights) {
  heights.sort((a, b) => a - b);

  const n = heights.length;
  const minusV = [];

  if (n % 2 === 1) { // 홀수
    for (let i = 0; i < Math.floor(n / 2); i++) {
      minusV.push(heights[i + Math.floor(n / 2)] - heights[i]);
    }
    minusV.push(heights[n - 1] - heights[Math.floor(n / 2)]);
    minusV.sort((a, b) => a - b);
    return minusV[1];
  } else { // 짝수
    for (let i = 0; i < n / 2; i++) {
      minusV.push(heights[i + n / 2] - heights[i]);
    }
    minusV.sort((a, b) => a - b);
    return minusV[0];
  }
}