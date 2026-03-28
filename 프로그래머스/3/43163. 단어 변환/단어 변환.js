function solution(begin, target, words) {
    if (!words.includes(target)) return 0;

    const visited = Array(words.length).fill(false);
    const queue = [[begin, 0]];

    const canChange = (a, b) => {
        let diff = 0;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) diff++;
        }
        return diff === 1;
    };

    while (queue.length) {
        const [cur, step] = queue.shift();

        if (cur === target) return step;

        for (let i = 0; i < words.length; i++) {
            if (!visited[i] && canChange(cur, words[i])) {
                visited[i] = true;
                queue.push([words[i], step + 1]);
            }
        }
    }

    return 0;
}