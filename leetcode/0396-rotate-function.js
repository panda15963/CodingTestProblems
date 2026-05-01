function maxRotateFunction(nums) {
  const n = nums.length;
  const sum = nums.reduce((acc, v) => acc + v, 0);

  let f = nums.reduce((acc, v, i) => acc + v * i, 0);
  let max = f;

  for (let k = 1; k < n; k++) {
    f = f + sum - n * nums[n - k];
    max = Math.max(max, f);
  }

  return max;
}