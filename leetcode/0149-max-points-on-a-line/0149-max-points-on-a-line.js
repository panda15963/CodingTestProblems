function maxPoints(points) {
    const numPoints = points.length;

    // 최소 1개의 점은 항상 존재
    let maxPointsOnLine = 1;

    // 각 점을 첫 번째 점으로 설정
    for (let i = 0; i < numPoints; i++) {
        const x1 = points[i][0];
        const y1 = points[i][1];

        // 두 번째 점을 선택하여 직선 생성
        for (let j = i + 1; j < numPoints; j++) {
            const x2 = points[j][0];
            const y2 = points[j][1];

            // i, j 두 점은 이미 같은 직선 위에 있음
            let pointsOnCurrentLine = 2;

            // 나머지 점들이 같은 직선 위에 있는지 확인
            for (let k = j + 1; k < numPoints; k++) {
                const x3 = points[k][0];
                const y3 = points[k][1];

                // 외적을 이용한 일직선 여부 확인
                //
                // (y2 - y1) / (x2 - x1)
                // =
                // (y3 - y1) / (x3 - x1)
                //
                // 나눗셈을 피하기 위해 교차 곱
                if (
                    (y2 - y1) * (x3 - x1) ===
                    (y3 - y1) * (x2 - x1)
                ) {
                    pointsOnCurrentLine++;
                }
            }

            // 최댓값 갱신
            maxPointsOnLine = Math.max(
                maxPointsOnLine,
                pointsOnCurrentLine
            );
        }
    }

    return maxPointsOnLine;
}