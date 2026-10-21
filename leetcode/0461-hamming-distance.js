var hammingDistance = function(x, y) {
    x ^= y;
    let ans = 0;

    while (x) {
        x -= x & -x;
        ++ans;
    }

    return ans;
};