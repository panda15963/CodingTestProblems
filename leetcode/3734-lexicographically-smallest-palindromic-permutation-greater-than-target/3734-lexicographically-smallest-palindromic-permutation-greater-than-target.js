/**
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
var lexPalindromicPermutation = function(s, target) {
    const n = s.length;
    const counts = {};
    
    // 1. 문자 빈도수 카운트
    for (const ch of s) {
        counts[ch] = (counts[ch] || 0) + 1;
    }
    
    // 회문 가능 여부 체크
    const oddChars = Object.keys(counts).filter(ch => counts[ch] % 2 !== 0);
    if (oddChars.length > 1) {
        return "";
    }
    
    const hasMid = oddChars.length === 1;
    const midChar = hasMid ? oddChars[0] : "";
    
    // 전반부(First half)에 사용할 문자 풀 구성
    const halfCounts = {};
    for (const ch in counts) {
        const halfCnt = Math.floor(counts[ch] / 2);
        if (halfCnt > 0) {
            halfCounts[ch] = halfCnt;
        }
    }
    
    const halfLen = Math.floor(n / 2);
    const currentPath = [];
    const memo = new Map();
    
    // 2. 백트래킹 함수 정의
    const solve = (idx, isGreater) => {
        // 전반부가 완성된 경우
        if (idx === halfLen) {
            const firstHalf = currentPath.join("");
            const secondHalf = [...firstHalf].reverse().join("");
            const fullPalindrome = firstHalf + midChar + secondHalf;
            
            // target보다 엄격하게 큰지 확인
            return fullPalindrome > target ? fullPalindrome : "";
        }
        
        // 메모이제이션 키 확인
        const stateKey = `${idx}_${isGreater}`;
        if (memo.has(stateKey)) {
            return memo.get(stateKey);
        }
        
        // 사전순 탐색 범위 지정 ('a'부터 'z'까지)
        const startCharCode = isGreater ? 97 : target.charCodeAt(idx);
        
        for (let code = startCharCode; code <= 122; code++) {
            const ch = String.fromCharCode(code);
            
            if (halfCounts[ch] > 0) {
                halfCounts[ch]--;
                currentPath.push(ch);
                
                const nextGreater = isGreater || ch > target[idx];
                const result = solve(idx + 1, nextGreater);
                
                if (result !== "") {
                    return result; // 가장 먼저 찾은 유효한 결과가 최소값
                }
                
                // 백트래킹 복원
                currentPath.pop();
                halfCounts[ch]++;
            }
        }
        
        memo.set(stateKey, "");
        return "";
    };
    
    return solve(0, false);
};
