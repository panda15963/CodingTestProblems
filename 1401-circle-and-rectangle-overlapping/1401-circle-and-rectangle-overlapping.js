var checkOverlap = function(
    radius,
    xCenter,
    yCenter,
    x1,
    y1,
    x2,
    y2
) {
    const getMinimumDistanceToSegment = (
        segmentStart,
        segmentEnd,
        point
    ) => {
        if (segmentStart <= point && point <= segmentEnd) {
            return 0;
        }

        return point < segmentStart
            ? segmentStart - point
            : point - segmentEnd;
    };

    const horizontalDistance = getMinimumDistanceToSegment(
        x1,
        x2,
        xCenter
    );

    const verticalDistance = getMinimumDistanceToSegment(
        y1,
        y2,
        yCenter
    );

    return (
        horizontalDistance * horizontalDistance +
        verticalDistance * verticalDistance
        <= radius * radius
    );
};