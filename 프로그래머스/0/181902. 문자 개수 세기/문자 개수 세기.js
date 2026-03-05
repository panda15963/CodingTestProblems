function solution(my_string) {
    const answer = Array(52).fill(0);
    for (let char of my_string) {
        if (char >= 'A' && char <= 'Z') {
            answer[char.charCodeAt() - 'A'.charCodeAt()]++;
        } else {
            answer[26 + char.charCodeAt() - 'a'.charCodeAt()]++;
        }
    }
    return answer;
}
