function solution(sizes) {
    let maxW = 0, maxH = 0;
    for (let [w, h] of sizes) {
        maxW = Math.max(maxW, Math.min(w, h));
        maxH = Math.max(maxH, Math.max(w, h));
    }
    return maxW * maxH;
}
