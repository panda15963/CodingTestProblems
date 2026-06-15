function solution(order) {
    let answer = 0;

    for (const c of String(order)) {
        if (c === "3" || c === "6" || c === "9") {
            answer++;
        }
    }

    return answer;
}