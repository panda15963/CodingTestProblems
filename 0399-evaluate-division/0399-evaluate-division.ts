function calcEquation(
    equations: string[][],
    values: number[],
    queries: string[][]
): number[] {
    const graph: Map<string, Map<string, number>> = new Map();

    // 그래프 구성
    for (let i = 0; i < equations.length; i++) {
        const A = equations[i][0];
        const B = equations[i][1];

        if (!graph.has(A)) {
            graph.set(A, new Map());
        }

        if (!graph.has(B)) {
            graph.set(B, new Map());
        }

        graph.get(A)!.set(B, values[i]);
        graph.get(B)!.set(A, 1 / values[i]);
    }

    // A / C 계산
    const divide = (
        A: string,
        C: string,
        seen: Set<string>
    ): number => {
        if (A === C) {
            return 1.0;
        }

        seen.add(A);

        for (const [B, value] of graph.get(A)!) {
            if (seen.has(B)) {
                continue;
            }

            const res = divide(B, C, seen);

            if (res > 0) {
                return value * res;
            }
        }

        return -1.0;
    };

    const answer: number[] = [];

    for (const [A, C] of queries) {
        if (!graph.has(A) || !graph.has(C)) {
            answer.push(-1.0);
        } else {
            answer.push(divide(A, C, new Set()));
        }
    }

    return answer;
}