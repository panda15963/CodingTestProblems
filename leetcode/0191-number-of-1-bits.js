function hammingWeight(n) {
    let cnt = 0;

    while (n !== 0) {
        cnt++;
        n &= (n - 1);
    }

    return cnt;
}