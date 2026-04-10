function minimumDistance(nums: number[]): number {
  const n = nums.length;
  let minDistance = Number.MAX_SAFE_INTEGER;
  let found = false;

  for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      if (nums[i] !== nums[j]) continue;

      for (let k = j + 1; k < n; k++) {
        if (nums[i] === nums[k]) {
          const currentDistance =
            Math.abs(i - j) + Math.abs(j - k) + Math.abs(k - i);
          minDistance = Math.min(minDistance, currentDistance);
          found = true;
        }
      }
    }
  }

  return found ? minDistance : -1;
}