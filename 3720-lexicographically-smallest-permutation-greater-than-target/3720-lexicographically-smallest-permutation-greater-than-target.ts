function lexGreaterPermutation(s: string, target: string): string {
    const n: number = s.length;
    const count: number[] = new Array(26).fill(0);
    
    // s의 문자 빈도수 카운트
    for (let i = 0; i < n; i++) {
        count[s.charCodeAt(i) - 97]++;
    }
    
    const result: string[] = new Array(n);
    
    // 1단계: target과 최대한 일치시키며 매칭 시도
    let matchLen: number = 0;
    for (let i = 0; i < n; i++) {
        const tIdx: number = target.charCodeAt(i) - 97;
        if (count[tIdx] > 0) {
            result[i] = target[i];
            count[tIdx]--;
            matchLen++;
        } else {
            break;
        }
    }
    
    // 2단계: 뒤에서부터 분기점(Divergence Point)을 찾으며 역추적
    for (let i = matchLen; i >= 0; i--) {
        if (i === n) {
            i--;
            count[result[i].charCodeAt(0) - 97]++;
        }
        
        const targetCharIdx: number = target.charCodeAt(i) - 97;
        
        // target[i]보다 사전순으로 큰 가장 작은 문자 탐색
        let nextCharIdx: number = -1;
        for (let c = targetCharIdx + 1; c < 26; c++) {
            if (count[c] > 0) {
                nextCharIdx = c;
                break;
            }
        }
        
        // 더 큰 문자를 발견했다면 이 자리에 배치하고 뒤쪽은 오름차순 정렬
        if (nextCharIdx !== -1) {
            result[i] = String.fromCharCode(nextCharIdx + 97);
            count[nextCharIdx]--;
            
            let resIdx: number = i + 1;
            for (let c = 0; c < 26; c++) {
                while (count[c] > 0) {
                    result[resIdx++] = String.fromCharCode(c + 97);
                    count[c]--;
                }
            }
            return result.join('');
        }
        
        // 한 칸 앞(i-1)으로 역추적하기 위해 문자 원상복구
        if (i > 0) {
            count[result[i - 1].charCodeAt(0) - 97]++;
        }
    }
    
    return "";
}
