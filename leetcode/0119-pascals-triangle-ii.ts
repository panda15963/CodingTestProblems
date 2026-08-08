function getRow(rowIndex: number): number[] {
    if (rowIndex === 0) {
        return [1];
    }

    if (rowIndex === 1) {
        return [1, 1];
    }

    let prev: number[] = [1, 1];

    for (let i = 2; i <= rowIndex; i++) {
        const cur: number[] = [];

        cur.push(1);

        for (let j = 1; j < i; j++) {
            cur.push(prev[j - 1] + prev[j]);
        }

        cur.push(1);

        prev = cur;
    }

    return prev;
}