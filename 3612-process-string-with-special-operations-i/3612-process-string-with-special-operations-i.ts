function processStr(s: string): string {
    const result: string[] = [];

    for (const ch of s) {
        if (ch >= 'a' && ch <= 'z') {
            result.push(ch);
        } else if (ch === '*') {
            if (result.length > 0) {
                result.pop();
            }
        } else if (ch === '#') {
            result.push(...result);
        } else if (ch === '%') {
            result.reverse();
        }
    }

    return result.join('');
}