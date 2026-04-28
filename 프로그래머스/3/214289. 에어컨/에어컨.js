/**
 * 프로그래머스 "에어컨" 문제 JavaScript 솔루션
 * @param {number} temperature - 실외온도
 * @param {number} t1 - 최소기준온도
 * @param {number} t2 - 최대기준온도
 * @param {number} a - 희망온도≠실내온도 소비전력
 * @param {number} b - 희망온도=실내온도 소비전력
 * @param {number[]} onboard - 탑승여부 배열
 * @returns {number} 최소 소비전력
 */
function solution(temperature, t1, t2, a, b, onboard) {
    const K = 1000 * 100;
    t1 += 10;
    t2 += 10;
    temperature += 10;
    
    const n = onboard.length;
    const DP = new Array(n).fill(0).map(() => new Array(51).fill(K));
    
    DP[0][temperature] = 0;
    
    const flag = temperature > t2 ? -1 : 1;
    
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < 51; j++) {
            if ((onboard[i] === 1 && t1 <= j && j <= t2) || onboard[i] === 0) {
                let minV = K;
                
                // 에어컨 끄기 (자연 변화: flag 방향)
                if (0 <= j + flag && j + flag <= 50) {
                    minV = Math.min(minV, DP[i-1][j + flag]);
                }
                
                // 현재 온도 유지 (temperature와 같을 때)
                if (j === temperature) {
                    minV = Math.min(minV, DP[i-1][j]);
                }
                
                // 반대 방향 변화 (+a)
                if (0 <= j - flag && j - flag <= 50) {
                    minV = Math.min(minV, DP[i-1][j - flag] + a);
                }
                
                // 희망온도 유지 (+b)
                if (t1 <= j && j <= t2) {
                    minV = Math.min(minV, DP[i-1][j] + b);
                }
                
                DP[i][j] = minV;
            }
        }
    }
    
    // 마지막 시간대 최소값 찾기
    let answer = DP[n-1][0];
    for (let j = 1; j < 51; j++) {
        answer = Math.min(answer, DP[n-1][j]);
    }
    return answer;
}