function findRepeatedDnaSequences(s: string): string[] {
    const seen: Set<string> = new Set();
    const res: Set<string> = new Set();

    for (let l = 0; l <= s.length - 10; l++) {
        const cur: string = s.substring(l, l + 10);

        if (seen.has(cur)) {
            res.add(cur);
        }

        seen.add(cur);
    }

    return Array.from(res);
}