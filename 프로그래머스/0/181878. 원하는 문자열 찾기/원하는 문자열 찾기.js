function solution(myString, pat) {
    const s = myString.toLowerCase();
    const p = pat.toLowerCase();
    return s.includes(p) ? 1 : 0;
}
