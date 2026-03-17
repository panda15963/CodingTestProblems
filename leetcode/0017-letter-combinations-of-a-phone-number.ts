function letterCombinations(digits: string): string[] {
    if (!digits || digits.length === 0) return [];

    const map: Record<string, string> = {
        '2': 'abc', '3': 'def', '4': 'ghi',
        '5': 'jkl', '6': 'mno', '7': 'pqrs',
        '8': 'tuv', '9': 'wxyz'
    };

    const result: string[] = [];

    const backtrack = (index: number, path: string): void => {
        if (index === digits.length) {
            result.push(path);
            return;
        }

        const letters = map[digits[index]];

        for (const char of letters) {
            backtrack(index + 1, path + char);
        }
    };

    backtrack(0, "");
    return result;
}