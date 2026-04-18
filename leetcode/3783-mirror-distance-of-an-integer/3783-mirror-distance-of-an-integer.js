function mirrorDistance(n) {
    const reversedStr = n.toString().split('').reverse().join('');
    const reversed = parseInt(reversedStr, 10);
    return Math.abs(n - reversed);
}