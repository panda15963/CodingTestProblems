var generate = function (numRows) {
    const result = [];

    for (let i = 0; i < numRows; i++) {
        const list = [];

        for (let j = 0; j <= i; j++) {
            // 양 끝은 항상 1
            if (j === 0 || j === i) {
                list.push(1);
            } else {
                const prev = result[i - 1][j - 1];
                const next = result[i - 1][j];

                list.push(prev + next);
            }
        }

        result.push(list);
    }

    return result;
};