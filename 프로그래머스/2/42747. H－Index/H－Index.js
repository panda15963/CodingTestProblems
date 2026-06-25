function solution(citations) {
    // 오름차순 정렬
    citations.sort((a, b) => a - b);

    let answer = 0;

    for (let i = 0; i < citations.length; i++) {
        const h = citations.length - i;

        if (citations[i] >= h) {
            answer = h;
            break;
        }
    }

    return answer;
}