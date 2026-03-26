function solution(brown, yellow) {
    let total = brown + yellow;
    for (let w = 1; w <= total; w++) {
        let h = total / w;
        if (Number.isInteger(h)) {
            if (2 * (w + h - 2) === brown) {
                return [Math.max(w, h), Math.min(w, h)];
            }
        }
    }
    return [];
}
