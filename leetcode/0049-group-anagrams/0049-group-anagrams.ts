function groupAnagrams(strs: string[]): string[][] {
    const anagrams: Map<string, string[]> = new Map();

    for (const str of strs) {
        const key: string = [...str].sort().join("");

        if (!anagrams.has(key)) {
            anagrams.set(key, []);
        }

        anagrams.get(key)!.push(str);
    }

    return Array.from(anagrams.values());
}