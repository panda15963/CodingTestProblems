function removeInvalidParentheses(s) {
    const result = new Set();

    let leftToRemove = 0;
    let rightToRemove = 0;

    const n = s.length;

    // First pass: calculate minimum number of parentheses to remove
    for (const char of s) {
        if (char === '(') {
            leftToRemove++;
        } else if (char === ')') {
            if (leftToRemove > 0) {
                leftToRemove--;
            } else {
                rightToRemove++;
            }
        }
    }

    // DFS function
    const dfs = (
        index,
        leftRem,
        rightRem,
        leftCount,
        rightCount,
        current
    ) => {
        // Base case
        if (index === n) {
            if (leftRem === 0 && rightRem === 0) {
                result.add(current);
            }
            return;
        }

        // Pruning
        if (
            n - index < leftRem + rightRem ||
            leftCount < rightCount
        ) {
            return;
        }

        // Option 1: Remove '('
        if (s[index] === '(' && leftRem > 0) {
            dfs(
                index + 1,
                leftRem - 1,
                rightRem,
                leftCount,
                rightCount,
                current
            );
        }

        // Option 2: Remove ')'
        if (s[index] === ')' && rightRem > 0) {
            dfs(
                index + 1,
                leftRem,
                rightRem - 1,
                leftCount,
                rightCount,
                current
            );
        }

        // Option 3: Keep current character
        const addLeft = s[index] === '(' ? 1 : 0;
        const addRight = s[index] === ')' ? 1 : 0;

        dfs(
            index + 1,
            leftRem,
            rightRem,
            leftCount + addLeft,
            rightCount + addRight,
            current + s[index]
        );
    };

    // Start DFS
    dfs(
        0,
        leftToRemove,
        rightToRemove,
        0,
        0,
        ""
    );

    return Array.from(result);
}