function canBeEqual(s1: string, s2: string): boolean {
    const sortPair = (a: string, b: string): string =>
        [a, b].sort().join('');

    return (
        sortPair(s1[0], s1[2]) === sortPair(s2[0], s2[2]) &&
        sortPair(s1[1], s1[3]) === sortPair(s2[1], s2[3])
    );
}