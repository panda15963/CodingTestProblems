function characterReplacement(s: string, k: number): number {
    let maxLen: number = 0;
    let maxCnt: number = 0;
    const counter: number[] = new Array(26).fill(0);
    let start: number = 0;

    for (let end = 0; end < s.length; end++) {
        const index: number = s.charCodeAt(end) - 'A'.charCodeAt(0);

        counter[index]++;
        maxCnt = Math.max(counter[index], maxCnt);

        if (end - start + 1 - maxCnt > k) {
            counter[s.charCodeAt(start) - 'A'.charCodeAt(0)]--;
            start++;
        }

        maxLen = Math.max(end - start + 1, maxLen);
    }

    return maxLen;
}