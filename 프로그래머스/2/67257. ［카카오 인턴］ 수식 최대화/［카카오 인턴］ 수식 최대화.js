function solution(expression) {
    let ans = Number.MIN_SAFE_INTEGER;

    const perm = new Array(3);
    const visit = new Array(3).fill(false);
    const priority = new Map();

    const numList = [];
    const opList = [];

    // 숫자와 연산자 분리
    const tokens = expression.split(/([+\-*])/);

    for (const token of tokens) {
        if (token === "+" || token === "-" || token === "*") {
            opList.push(token);
        } else {
            numList.push(Number(token));
        }
    }

    function calc(n1, n2, op) {
        if (op === "+") return n1 + n2;
        if (op === "-") return n2 - n1;
        return n1 * n2;
    }

    function solve() {
        const numStack = [];
        const opStack = [];

        numStack.push(numList[0]);

        for (let i = 0; i < opList.length; i++) {
            const op = opList[i];

            while (
                opStack.length &&
                priority.get(opStack[opStack.length - 1]) >= priority.get(op)
            ) {
                const a = numStack.pop();
                const b = numStack.pop();
                numStack.push(calc(a, b, opStack.pop()));
            }

            numStack.push(numList[i + 1]);
            opStack.push(op);
        }

        while (numStack.length > 1) {
            const a = numStack.pop();
            const b = numStack.pop();
            numStack.push(calc(a, b, opStack.pop()));
        }

        ans = Math.max(ans, Math.abs(numStack.pop()));
    }

    function permutation(idx) {
        if (idx === 3) {
            priority.set("+", perm[0]);
            priority.set("-", perm[1]);
            priority.set("*", perm[2]);

            solve();
            return;
        }

        for (let i = 0; i < 3; i++) {
            if (visit[i]) continue;

            visit[i] = true;
            perm[idx] = i;

            permutation(idx + 1);

            visit[i] = false;
        }
    }

    permutation(0);

    return ans;
}