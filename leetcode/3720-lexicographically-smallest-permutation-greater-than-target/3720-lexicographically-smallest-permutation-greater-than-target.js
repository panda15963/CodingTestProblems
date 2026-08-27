/**
 * @param {string} s
 * @param {string} target
 * @return {string}
 */
var lexGreaterPermutation = function(s, target) {
    const n = s.length;
    const count = new Array(26).fill(0);
    
    // s의 문자 빈도수 카운트
    for (let i = 0; i < n; i++) {
        count[s.charCodeAt(i) - 97]++;
    }
    
    const result = new Array(n);
    
    // 1단계: target과 최대한 일치시키며 매칭 시도
    let matchLen = 0;
    for (let i = 0; i < n; i++) {
        const tIdx = target.charCodeAt(i) - 97;
        if (count[tIdx] > 0) {
            result[i] = target[i];
            count[tIdx]--;
            matchLen++;
        } else {
            break; // 현재 문자가 없으면 접두사 매칭 중단
        }
    }
    
    // 2단계: 뒤에서부터 분기점(Divergence Point)을 찾으며 역추적
    for (let i = matchLen; i >= 0; i--) {
        // 이미 s의 순열이 target과 완벽히 같아진 상태(i === n)라면,
        // target보다 '엄격히 큰' 문자열을 만들기 위해 마지막 자리를 강제로 돌려놓습니다.
        if (i === n) {
            i--;
            count[result[i].charCodeAt(0) - 97]++;
        }
        
        const targetCharIdx = target.charCodeAt(i) - 97;
        
        // target[i]보다 사전순으로 큰 가장 작은 문자 탐색
        let nextCharIdx = -1;
        for (let c = targetCharIdx + 1; c < 26; c++) {
            if (count[c] > 0) {
                nextCharIdx = c;
                break;
            }
        }
        
        // 더 큰 문자를 찾았다면 그 문자를 배치하고 남은 자리를 사전순 최소로 채움
        if (nextCharIdx !== -1) {
            result[i] = String.fromCharCode(nextCharIdx + 97);
            count[nextCharIdx]--;
            
            // i 이후의 모든 남은 칸을 사용 가능한 가장 작은 문자들로 채움
            let resIdx = i + 1;
            for (let c = 0; c < 26; c++) {
                while (count[c] > 0) {
                    result[resIdx++] = String.fromCharCode(c + 97);
                    count[c]--;
                }
            }
            return result.join('');
        }
        
        // 현재 자리(i)에서 더 큰 문자를 쓰지 못했다면, 
        // 한 칸 앞(i-1)을 바꾸기 위해 이전에 맞춰놓았던 문자를 수량에 돌려놓습니다.
        if (i > 0) {
            count[result[i - 1].charCodeAt(0) - 97]++;
        }
    }
    
    // 만족하는 순열이 존재하지 않으면 빈 문자열 반환
    return "";
};
