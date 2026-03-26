function solution(numbers) {
    const strs = numbers.map(n => String(n));
    strs.sort((a, b) => {
        if (a.length !== b.length) return (b + a).localeCompare(a + b);
        return b.localeCompare(a);
    });
    // 또는 더 정확히:
    // return (b + a > a + b ? -1 : (a + b > b + a ? 1 : 0));
    const joined = strs.join('');
    return joined[0] === '0' ? '0' : joined;
}
