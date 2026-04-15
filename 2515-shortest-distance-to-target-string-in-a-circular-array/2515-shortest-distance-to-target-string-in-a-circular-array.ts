function closestTarget(words: string[], target: string, startIndex: number): number {
    const n: number = words.length;
    let minDist: number = n;
    
    for (let i: number = 0; i < n; i++) {
        if (words[i] === target) {
            const direct: number = Math.abs(i - startIndex);
            const wrap: number = n - direct;
            minDist = Math.min(minDist, Math.min(direct, wrap));
        }
    }
    
    return minDist === n ? -1 : minDist;
}