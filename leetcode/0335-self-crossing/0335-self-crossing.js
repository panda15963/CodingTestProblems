var isSelfCrossing = function(distance) {
    for (let i = 3; i < distance.length; i++) {
        // Case 1: 4th line crosses 1st line
        if (
            distance[i] >= distance[i - 2] &&
            distance[i - 1] <= distance[i - 3]
        ) {
            return true;
        }

        // Case 2: 5th line crosses 2nd line
        if (
            i >= 4 &&
            distance[i - 1] === distance[i - 3] &&
            distance[i] + distance[i - 4] >= distance[i - 2]
        ) {
            return true;
        }

        // Case 3: 6th line crosses 3rd line
        if (
            i >= 5 &&
            distance[i - 2] >= distance[i - 4] &&
            distance[i - 1] <= distance[i - 3] &&
            distance[i] >= distance[i - 2] - distance[i - 4] &&
            distance[i - 1] + distance[i - 5] >= distance[i - 3]
        ) {
            return true;
        }
    }

    return false;
};