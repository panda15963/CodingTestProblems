var canIWin = function(maxChoosableInteger, desiredTotal) {
    if (desiredTotal <= 0) {
        return true;
    }

    const sumOfAllIntegers =
        (maxChoosableInteger * (maxChoosableInteger + 1)) / 2;

    if (sumOfAllIntegers < desiredTotal) {
        return false;
    }

    const memoCache = {};

    const canCurrentPlayerWin = (usedNumbersMask, currentSum) => {
        if (Object.prototype.hasOwnProperty.call(memoCache, usedNumbersMask)) {
            return memoCache[usedNumbersMask];
        }

        for (let number = 1; number <= maxChoosableInteger; number++) {
            const bit = 1 << number;

            if ((usedNumbersMask & bit) !== 0) {
                continue;
            }

            const newSum = currentSum + number;

            if (
                newSum >= desiredTotal ||
                !canCurrentPlayerWin(usedNumbersMask | bit, newSum)
            ) {
                memoCache[usedNumbersMask] = true;
                return true;
            }
        }

        memoCache[usedNumbersMask] = false;
        return false;
    };

    return canCurrentPlayerWin(0, 0);
};