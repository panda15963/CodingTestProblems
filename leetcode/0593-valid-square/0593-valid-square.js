
/**
 * Checks whether four points form a valid square
 * @param {number[]} p1
 * @param {number[]} p2
 * @param {number[]} p3
 * @param {number[]} p4
 * @returns {boolean}
 */
function validSquare(p1, p2, p3, p4) {
    // 네 점으로 만들 수 있는 모든 세 점의 조합이
    // 직각 이등변 삼각형인지 확인
    return checkRightIsoscelesTriangle(p1, p2, p3) &&
           checkRightIsoscelesTriangle(p1, p3, p4) &&
           checkRightIsoscelesTriangle(p1, p2, p4) &&
           checkRightIsoscelesTriangle(p2, p3, p4);
}

function checkRightIsoscelesTriangle(pointA, pointB, pointC) {
    // 좌표 추출
    const x1 = pointA[0], y1 = pointA[1];
    const x2 = pointB[0], y2 = pointB[1];
    const x3 = pointC[0], y3 = pointC[1];

    // 세 점 사이의 거리 제곱 계산
    const distSquaredAB =
        (x1 - x2) * (x1 - x2) +
        (y1 - y2) * (y1 - y2);

    const distSquaredAC =
        (x1 - x3) * (x1 - x3) +
        (y1 - y3) * (y1 - y3);

    const distSquaredBC =
        (x2 - x3) * (x2 - x3) +
        (y2 - y3) * (y2 - y3);

    // Case 1: AB와 AC가 같은 변이고 BC가 빗변
    if (
        distSquaredAB === distSquaredAC &&
        distSquaredAB + distSquaredAC === distSquaredBC &&
        distSquaredAB > 0
    ) {
        return true;
    }

    // Case 2: AB와 BC가 같은 변이고 AC가 빗변
    if (
        distSquaredAB === distSquaredBC &&
        distSquaredAB + distSquaredBC === distSquaredAC &&
        distSquaredAB > 0
    ) {
        return true;
    }

    // Case 3: AC와 BC가 같은 변이고 AB가 빗변
    if (
        distSquaredAC === distSquaredBC &&
        distSquaredAC + distSquaredBC === distSquaredAB &&
        distSquaredAC > 0
    ) {
        return true;
    }

    return false;
}
