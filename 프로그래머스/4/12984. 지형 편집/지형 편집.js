function solution(land, P, Q) {

    let answer = Number.MAX_SAFE_INTEGER;

    let minHeight = Number.MAX_SAFE_INTEGER;
    let maxHeight = 0;

    for (const row of land) {
        for (const h of row) {
            minHeight = Math.min(minHeight, h);
            maxHeight = Math.max(maxHeight, h);
        }
    }

    while (true) {

        const mid = Math.floor((minHeight + maxHeight) / 2);

        const midMinusOneValue = findValue(mid - 1, land, P, Q);
        const midValue = findValue(mid, land, P, Q);
        const midPlusOneValue = findValue(mid + 1, land, P, Q);

        if (
            midValue <= midMinusOneValue &&
            midValue <= midPlusOneValue
        ) {

            answer = midValue;
            break;

        } else if (midMinusOneValue < midValue) {

            maxHeight = mid - 1;

        } else {

            minHeight = mid + 1;
        }
    }

    return answer;
}

function findValue(h, land, P, Q) {

    let cost = 0;

    for (const row of land) {
        for (const height of row) {

            if (h > height) {
                cost += (h - height) * P;
            } else if (h < height) {
                cost += (height - h) * Q;
            }
        }
    }

    return cost;
}