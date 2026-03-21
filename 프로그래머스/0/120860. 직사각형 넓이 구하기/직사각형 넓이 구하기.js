function solution(dots) {
    const xs = dots.map(dot => dot[0]);
    const ys = dots.map(dot => dot[1]);

    const width = Math.max(...xs) - Math.min(...xs);
    const height = Math.max(...ys) - Math.min(...ys);

    return width * height;
}