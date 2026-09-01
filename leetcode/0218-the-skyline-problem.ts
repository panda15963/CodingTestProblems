/**
 * @param buildings
 * @returns Skyline의 핵심 좌표
 */
function getSkyline(buildings: number[][]): number[][] {
    // 모든 건물의 시작점과 끝점 수집
    const uniquePositions = new Set<number>();

    for (const building of buildings) {
        uniquePositions.add(building[0]);
        uniquePositions.add(building[1]);
    }

    // 좌표를 오름차순으로 정렬
    const sortedPositions: number[] = Array.from(
        uniquePositions
    ).sort((a, b) => a - b);

    // 좌표 → 인덱스 매핑
    const positionToIndex = new Map<number, number>();

    sortedPositions.forEach((position, index) => {
        positionToIndex.set(position, index);
    });

    // 각 좌표 구간의 최대 높이
    const maxHeights: number[] =
        new Array(sortedPositions.length).fill(0);

    // 건물별 최대 높이 계산
    for (const building of buildings) {
        const left: number = building[0];
        const right: number = building[1];
        const height: number = building[2];

        const leftIndex = positionToIndex.get(left)!;
        const rightIndex = positionToIndex.get(right)!;

        // [left, right) 구간 업데이트
        for (let i = leftIndex; i < rightIndex; i++) {
            maxHeights[i] = Math.max(
                maxHeights[i],
                height
            );
        }
    }

    // Skyline 생성
    const skyline: number[][] = [];

    let previousHeight: number = -1;

    for (
        let i = 0;
        i < sortedPositions.length;
        i++
    ) {
        const currentPosition: number =
            sortedPositions[i];

        const currentHeight: number =
            maxHeights[i];

        // 이전 높이와 다를 때만 추가
        if (currentHeight !== previousHeight) {
            skyline.push([
                currentPosition,
                currentHeight
            ]);

            previousHeight = currentHeight;
        }
    }

    return skyline;
}