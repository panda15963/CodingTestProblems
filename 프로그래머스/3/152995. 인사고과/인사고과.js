function solution(scores) {
    const wanho = scores[0];
    const wanhoScore = wanho[0] + wanho[1];
    let answer = 1;

    // 1. 근무 태도 내림차순, 동료 평가 오름차순 정렬
    scores.sort((a, b) => {
        if (a[0] === b[0]) return a[1] - b[1];
        return b[0] - a[0];
    });

    let maxPeer = 0;

    for (const score of scores) {
        // 2. 인센티브 탈락자 체크
        if (score[1] < maxPeer) {
            // 탈락자가 완호인 경우
            if (score[0] === wanho[0] && score[1] === wanho[1]) {
                return -1;
            }
        } else {
            // 3. 인센티브 대상자 중 완호보다 점수 합이 높은 사람 카운트
            if (score[0] + score[1] > wanhoScore) {
                answer++;
            }
            maxPeer = Math.max(maxPeer, score[1]);
        }
    }

    return answer;
}