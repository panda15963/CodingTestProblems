function leastInterval(tasks: string[], n: number): number {
    const map = new Map<string, number>();
    let count = 0;

    for (const task of tasks) {
        map.set(task, (map.get(task) || 0) + 1);
        count = Math.max(map.get(task)!, count);
    }

    let result = (count - 1) * (n + 1);

    for (const frequency of map.values()) {
        if (frequency === count) {
            result++;
        }
    }

    return Math.max(tasks.length, result);
}