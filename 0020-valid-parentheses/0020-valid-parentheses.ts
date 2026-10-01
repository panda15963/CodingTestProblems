function isValid(s: string): boolean {
    const stack: string[] = [];

    const table: Record<string, string> = {
        ')': '(',
        '}': '{',
        ']': '['
    };

    for (const char of s) {
        if (!(char in table)) {
            stack.push(char);
        } else if (
            stack.length === 0 ||
            table[char] !== stack.pop()
        ) {
            return false;
        }
    }

    return stack.length === 0;
}