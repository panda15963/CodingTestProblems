function solution(m, n, startX, startY, balls) {
    const result = new Array(balls.length);

    for (let i = 0; i < balls.length; i++) {
        const x = startX - balls[i][0]; // X 거리
        const y = startY - balls[i][1]; // Y 거리

        const l = (startX + balls[i][0]) ** 2 + y ** 2; // 왼쪽 벽 반사
        const r = ((m - startX) + (m - balls[i][0])) ** 2 + y ** 2; // 오른쪽 벽 반사
        const d = (startY + balls[i][1]) ** 2 + x ** 2; // 아래쪽 벽 반사
        const t = ((n - startY) + (n - balls[i][1])) ** 2 + x ** 2; // 위쪽 벽 반사

        result[i] = Math.min(l, r, d, t);

        if (x === 0) {
            if (y > 0) {
                result[i] = Math.min(l, r, t);
            } else {
                result[i] = Math.min(l, r, d);
            }
        } else if (y === 0) {
            if (x > 0) {
                result[i] = Math.min(d, t, r);
            } else {
                result[i] = Math.min(d, t, l);
            }
        } else {
            result[i] = Math.min(l, r, d, t);
        }
    }

    return result;
}