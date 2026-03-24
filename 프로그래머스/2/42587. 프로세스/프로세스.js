function solution(priorities, location) {
  const queue = priorities.map((p, i) => [p, i]);
  let count = 0;

  while (queue.length > 0) {
    const [priority, idx] = queue.shift();
    const hasHigher = queue.some(([p]) => p > priority);

    if (hasHigher) {
      queue.push([priority, idx]);
    } else {
      count++;
      if (idx === location) return count;
    }
  }
}
