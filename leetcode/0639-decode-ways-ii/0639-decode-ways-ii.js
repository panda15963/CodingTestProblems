var numDecodings = function(s) {
    const MOD = 1000000007;
    const length = s.length;
    const chars = s.split('');

    // prev2: dp[i-2]
    // prev1: dp[i-1]
    // current: dp[i]
    let prev2 = 0;
    let prev1 = 1;
    let current = 0;

    for (let i = 1; i <= length; i++) {
        // 한 자리 숫자로 해석하는 경우
        if (chars[i - 1] === '*') {
            // '*'는 1~9까지 9가지
            current = (9 * prev1) % MOD;
        } else if (chars[i - 1] !== '0') {
            // 0이 아닌 숫자는 단독 해석 가능
            current = prev1;
        } else {
            // 0은 단독 해석 불가능
            current = 0;
        }

        // 두 자리 숫자로 해석하는 경우
        if (i > 1) {
            if (chars[i - 2] === '*' && chars[i - 1] === '*') {
                // "**" = 11~19 (9가지) + 21~26 (6가지)
                current = (current + 15 * prev2) % MOD;
            } else if (chars[i - 2] === '*') {
                // "*X"
                if (chars[i - 1] > '6') {
                    // 17~19 등 첫 숫자 1만 가능
                    current = (current + prev2) % MOD;
                } else {
                    // 10~16 또는 20~26
                    current = (current + 2 * prev2) % MOD;
                }
            } else if (chars[i - 1] === '*') {
                // "X*"
                if (chars[i - 2] === '1') {
                    // 11~19 : 9가지
                    current = (current + 9 * prev2) % MOD;
                } else if (chars[i - 2] === '2') {
                    // 21~26 : 6가지
                    current = (current + 6 * prev2) % MOD;
                }
            } else if (chars[i - 2] !== '0') {
                // 일반 숫자 두 개의 조합
                const twoDigitValue =
                    parseInt(chars[i - 2]) * 10 + parseInt(chars[i - 1]);

                if (twoDigitValue <= 26) {
                    current = (current + prev2) % MOD;
                }
            }
        }

        // DP 변수 갱신
        prev2 = prev1;
        prev1 = current;
    }

    return current;
};