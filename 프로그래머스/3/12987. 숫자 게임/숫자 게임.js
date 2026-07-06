function solution(A, B) {

    let answer = 0;

    A.sort((a, b) => a - b);
    B.sort((a, b) => a - b);

    let bIndex = B.length - 1;

    // 뒤에서부터 비교
    for (let i = A.length - 1; i >= 0; i--) {

        // B가 더 큰 경우에만 승리
        if (bIndex >= 0 && B[bIndex] > A[i]) {
            answer++;
            bIndex--;
        }
    }

    return answer;
}