function lexPalindromicPermutation(s: string, target: string): string {
    const n: number = s.length;
    const counts: Record<string, number> = {};
    
    // 1. 문자 빈도수 카운트
    for (const ch of s) {
        counts[ch] = (counts[ch] || 0) + 1;
    }
    
    // 회문 가능 여부 체크 (홀수 번 등장하는 문자가 2개 이상이면 불가)
    const oddChars: string[] = Object.keys(counts).filter(ch => counts[ch] % 2 !== 0);
    if (oddChars.length > 1) {
        return "";
    }
    
    const hasMid: boolean = oddChars.length === 1;
    const midChar: string = hasMid ? oddChars[0] : "";
    
    // 전반부(First half)에 사용할 문자 풀 구성
    const halfCounts: Record<string, number> = {};
    for (const ch in counts) {
        const halfCnt = Math.floor(counts[ch] / 2);
        if (halfCnt > 0) {
            halfCounts[ch] = halfCnt;
        }
    }
    
    const halfLen: number = Math.floor(n / 2);
    const currentPath: string[] = [];
    const memo: Map<string, string> = new Map();
    
    // 2. 백트래킹 함수 정의
    const solve = (idx: number, isGreater: boolean): string => {
        // 전반부가 완성된 경우
        if (idx === halfLen) {
            const firstHalf: string = currentPath.join("");
            const secondHalf: string = [...firstHalf].reverse().join("");
            const fullPalindrome: string = firstHalf + midChar + secondHalf;
            
            // target보다 엄격하게 큰지 확인
            return fullPalindrome > target ? fullPalindrome : "";
        }
        
        // 메모이제이션 키 확인
        const stateKey: string = `${idx}_${isGreater}`;
        if (memo.has(stateKey)) {
            return memo.get(stateKey)!;
        }
        
        // 사전순 탐색 범위 지정 ('a'부터 'z'까지)
        const startCharCode: number = isGreater ? 97 : target.charCodeAt(idx);
        
        for (let code = startCharCode; code <= 122; code++) {
            const ch: string = String.fromCharCode(code);
            
            if (halfCounts[ch] > 0) {
                halfCounts[ch]--;
                currentPath.push(ch);
                
                const nextGreater: boolean = isGreater || ch > target[idx];
                const result: string = solve(idx + 1, nextGreater);
                
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
}
