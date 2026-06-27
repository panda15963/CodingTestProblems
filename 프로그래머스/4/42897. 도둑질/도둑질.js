function solution(money) {
    const n = money.length;

    // 집이 하나인 경우
    if (n === 1) {
        return money[0];
    }

    // case 1: 첫 집 포함 (마지막 집 제외)
    const case1 = rob(money, 0, n - 2);

    // case 2: 첫 집 제외 (마지막 집 포함)
    const case2 = rob(money, 1, n - 1);

    return Math.max(case1, case2);
}

function rob(money, start, end) {
    let prev2 = 0; // dp[i-2]
    let prev1 = 0; // dp[i-1]

    for (let i = start; i <= end; i++) {
        const cur = Math.max(prev1, prev2 + money[i]);
        prev2 = prev1;
        prev1 = cur;
    }

    return prev1;
}