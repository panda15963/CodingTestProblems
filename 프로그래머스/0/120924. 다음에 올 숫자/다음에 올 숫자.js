function solution(common) {
    const diff = common[1] - common[0];
    if (common[2] - common[1] === diff) {
        return common[common.length - 1] + diff;
    }
    const ratio = common[1] / common[0];
    return common[common.length - 1] * ratio;
}
