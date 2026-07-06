function solution(d, budget) {

    d.sort((a, b) => b - a);

    const total = d.reduce((sum, cur) => sum + cur, 0);

    if (budget >= total) {
        return d.length;
    }

    let removed = 0;

    for (let i = 0; i < d.length; i++) {

        const remain = total - removed;

        if (budget >= remain) {
            return d.length - i;
        }

        removed += d[i];
    }

    return 0;
}