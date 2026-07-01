const DIV = 1000000007;

function sum(a, b) {
    return (a + b) % DIV;
}

class Count {
    constructor(sum, count, offset) {
        this.sum = sum;
        this.count = count;
        this.offset = offset;
    }
}

function solve(b) {
    const counts = [];

    for (let i = 0; i < b.length; i++) {
        const map = new Map();
        counts.push(map);

        let targetSum = b[i];

        if (i === 0) {
            map.set(targetSum, new Count(targetSum, 1, i));
        } else {
            let total = 0;

            for (const value of counts[i - 1].values()) {
                total = sum(total, value.count);
            }

            map.set(targetSum, new Count(targetSum, total, i));
        }

        while (true) {
            targetSum *= 2;

            const lastCount = map.get(targetSum / 2);
            if (!lastCount) break;

            const prevOffset = lastCount.offset - 1;
            if (prevOffset < 0) break;

            const prevMap = counts[prevOffset];

            if (!prevMap.has(targetSum / 2)) break;

            const count = prevMap.get(targetSum / 2);

            map.set(
                targetSum,
                new Count(targetSum, count.count, count.offset)
            );
        }
    }

    let answer = 0;

    for (const value of counts[counts.length - 1].values()) {
        answer = sum(answer, value.count);
    }

    return answer;
}

function solution(a, s) {
    const answer = [];
    let offset = 0;

    for (const len of s) {
        answer.push(solve(a.slice(offset, offset + len)));
        offset += len;
    }

    return answer;
}