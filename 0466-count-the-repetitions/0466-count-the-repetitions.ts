function getMaxRepetitions(s1: string, n1: number, s2: string, n2: number): number {
    const s1Length = s1.length;
    const s2Length = s2.length;

    const dp: number[][] = Array.from(
        { length: s2Length },
        () => [0, 0]
    );

    for (let startIndex = 0; startIndex < s2Length; startIndex++) {
        let currentS2Index = startIndex;
        let completeS2Count = 0;

        for (let s1Index = 0; s1Index < s1Length; s1Index++) {
            if (s1[s1Index] === s2[currentS2Index]) {
                currentS2Index++;

                if (currentS2Index === s2Length) {
                    currentS2Index = 0;
                    completeS2Count++;
                }
            }
        }

        dp[startIndex] = [completeS2Count, currentS2Index];
    }

    let totalS2Count = 0;
    let currentS2Position = 0;

    for (let remaining = n1; remaining > 0; remaining--) {
        totalS2Count += dp[currentS2Position][0];
        currentS2Position = dp[currentS2Position][1];
    }

    return Math.floor(totalS2Count / n2);
}