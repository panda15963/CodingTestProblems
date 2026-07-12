function arrayRankTransform(arr: number[]): number[] {
    // 배열을 복사한 후 오름차순 정렬
    const sortedArr: number[] = [...arr].sort((a, b) => a - b);

    const rankMap: Map<number, number> = new Map();

    for (const num of sortedArr) {
        if (!rankMap.has(num)) {
            rankMap.set(num, rankMap.size + 1);
        }
    }

    // 원본 배열의 각 값을 순위로 변환
    const result: number[] = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
        result[i] = rankMap.get(arr[i])!;
    }

    return result;
}