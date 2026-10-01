var isRectangleCover = function(rectangles) {
    let totalArea = 0;

    let minX = rectangles[0][0];
    let minY = rectangles[0][1];
    let maxX = rectangles[0][2];
    let maxY = rectangles[0][3];

    const cornerCount = new Map();

    const makePointKey = (x, y) => {
        return `${x},${y}`;
    };

    for (const rect of rectangles) {
        totalArea +=
            (rect[2] - rect[0]) *
            (rect[3] - rect[1]);

        minX = Math.min(minX, rect[0]);
        minY = Math.min(minY, rect[1]);
        maxX = Math.max(maxX, rect[2]);
        maxY = Math.max(maxY, rect[3]);

        const bottomLeft = makePointKey(rect[0], rect[1]);
        cornerCount.set(
            bottomLeft,
            (cornerCount.get(bottomLeft) || 0) + 1
        );

        const topLeft = makePointKey(rect[0], rect[3]);
        cornerCount.set(
            topLeft,
            (cornerCount.get(topLeft) || 0) + 1
        );

        const topRight = makePointKey(rect[2], rect[3]);
        cornerCount.set(
            topRight,
            (cornerCount.get(topRight) || 0) + 1
        );

        const bottomRight = makePointKey(rect[2], rect[1]);
        cornerCount.set(
            bottomRight,
            (cornerCount.get(bottomRight) || 0) + 1
        );
    }

    const expectedArea =
        (maxX - minX) *
        (maxY - minY);

    const boundingCornerBL = makePointKey(minX, minY);
    const boundingCornerTL = makePointKey(minX, maxY);
    const boundingCornerTR = makePointKey(maxX, maxY);
    const boundingCornerBR = makePointKey(maxX, minY);

    if (
        totalArea !== expectedArea ||
        cornerCount.get(boundingCornerBL) !== 1 ||
        cornerCount.get(boundingCornerTL) !== 1 ||
        cornerCount.get(boundingCornerTR) !== 1 ||
        cornerCount.get(boundingCornerBR) !== 1
    ) {
        return false;
    }

    cornerCount.delete(boundingCornerBL);
    cornerCount.delete(boundingCornerTL);
    cornerCount.delete(boundingCornerTR);
    cornerCount.delete(boundingCornerBR);

    for (const [point, count] of cornerCount) {
        if (count !== 2 && count !== 4) {
            return false;
        }
    }

    return true;
};