var wordBreak = function(s, wordDict) {
    const wordSet = new Set(wordDict);

    // dp[i] = s의 앞에서 i개 문자가 단어 조합으로 만들어질 수 있는지
    const dp = new Array(s.length + 1).fill(false);

    dp[0] = true;

    for (let i = 1; i <= s.length; i++) {
        // 잘라낼 단어의 시작 위치
        for (let j = i - 1; j >= 0; j--) {
            const word = s.substring(j, i);

            if (wordSet.has(word) && dp[j]) {
                dp[i] = true;
                break;
            }
        }
    }

    return dp[s.length];
};