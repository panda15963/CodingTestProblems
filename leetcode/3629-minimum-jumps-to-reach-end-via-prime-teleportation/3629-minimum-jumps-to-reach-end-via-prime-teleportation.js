function minJumps(nums) {
  const n = nums.length;

  let maxEl = 0;
  const mp = new Map();

  for (let i = 0; i < n; i++) {
    if (!mp.has(nums[i])) mp.set(nums[i], []);
    mp.get(nums[i]).push(i);
    maxEl = Math.max(maxEl, nums[i]);
  }

  const isPrime = new Array(maxEl + 1).fill(true);
  if (maxEl >= 0) isPrime[0] = false;
  if (maxEl >= 1) isPrime[1] = false;

  for (let num = 2; num * num <= maxEl; num++) {
    if (isPrime[num]) {
      for (let multiple = num * num; multiple <= maxEl; multiple += num) {
        isPrime[multiple] = false;
      }
    }
  }

  const queue = [0];
  let head = 0;
  const visited = new Array(n).fill(false);
  visited[0] = true;

  const seen = new Set();
  let steps = 0;

  while (head < queue.length) {
    const size = queue.length - head;

    for (let s = 0; s < size; s++) {
      const i = queue[head++];

      if (i === n - 1) return steps;

      if (i - 1 >= 0 && !visited[i - 1]) {
        visited[i - 1] = true;
        queue.push(i - 1);
      }

      if (i + 1 < n && !visited[i + 1]) {
        visited[i + 1] = true;
        queue.push(i + 1);
      }

      if (!isPrime[nums[i]] || seen.has(nums[i])) continue;

      for (let multiple = nums[i]; multiple <= maxEl; multiple += nums[i]) {
        const list = mp.get(multiple);
        if (!list) continue;

        for (const j of list) {
          if (!visited[j]) {
            visited[j] = true;
            queue.push(j);
          }
        }
      }

      seen.add(nums[i]);
    }

    steps++;
  }

  return steps;
}