function frequencySort(s: string): string {
    const count: Record<string, number> = {};

    for (const char of s) {
        count[char] = (count[char] || 0) + 1;
    }

    const sortedChars = [...s].sort((a, b) => {
        if (count[a] === count[b]) {
            return a.localeCompare(b);
        }

        return count[b] - count[a];
    });

    return sortedChars.join('');
}