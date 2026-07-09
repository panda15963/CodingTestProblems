function solution(n) {
    const count = bitCount(n);

    while (bitCount(++n) !== count);

    return n;
}

function bitCount(n) {
    let count = 0;

    for (let i = 0; i < 21; i++) {
        if ((n & (1 << i)) !== 0) {
            count++;
        }
    }

    return count;
}