function solution(s, n) {
    let answer = "";

    for (const ch of s) {
        if (ch === " ") {
            answer += " ";
        } else {
            const base =
                ch === ch.toUpperCase()
                    ? "A".charCodeAt(0)
                    : "a".charCodeAt(0);

            answer += String.fromCharCode(
                (ch.charCodeAt(0) - base + n) % 26 + base
            );
        }
    }

    return answer;
}