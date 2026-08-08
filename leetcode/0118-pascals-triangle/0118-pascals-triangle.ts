function generate(numRows: number): number[][] {
    const result: number[][] = [];

    for (let i = 0; i < numRows; i++) {
        const list: number[] = [];

        for (let j = 0; j <= i; j++) {
            // 양 끝은 항상 1
            if (j === 0 || j === i) {
                list.push(1);
            } else {
                const prev: number = result[i - 1][j - 1];
                const next: number = result[i - 1][j];

                list.push(prev + next);
            }
        }

        result.push(list);
    }

    return result;
}