/**
 * @param {number[][]} buildings
 * @return {number[][]}
 */
var getSkyline = function(buildings) {
    // 모든 건물의 시작점과 끝점 수집
    const uniquePositions = new Set();

    for (const building of buildings) {
        uniquePositions.add(building[0]);
        uniquePositions.add(building[1]);
    }

    // 좌표 오름차순 정렬
    const sortedPositions = Array.from(uniquePositions)
        .sort((a, b) => a - b);

    // 좌표 → 인덱스 매핑
    const positionToIndex = new Map();

    sortedPositions.forEach((position, index) => {
        positionToIndex.set(position, index);
    });

    // 각 좌표 구간의 최대 높이
    const maxHeights = new Array(
        sortedPositions.length
    ).fill(0);

    // 각 건물이 차지하는 구간의 최대 높이 계산
    for (const building of buildings) {
        const left = building[0];
        const right = building[1];
        const height = building[2];

        const leftIndex = positionToIndex.get(left);
        const rightIndex = positionToIndex.get(right);

        // [left, right) 구간 업데이트
        for (let i = leftIndex; i < rightIndex; i++) {
            maxHeights[i] = Math.max(
                maxHeights[i],
                height
            );
        }
    }

    // Skyline 생성
    const skyline = [];

    let previousHeight = -1;

    for (let i = 0; i < sortedPositions.length; i++) {
        const currentPosition = sortedPositions[i];
        const currentHeight = maxHeights[i];

        // 높이가 변경된 경우에만 추가
        if (currentHeight !== previousHeight) {
            skyline.push([
                currentPosition,
                currentHeight
            ]);

            previousHeight = currentHeight;
        }
    }

    return skyline;
};