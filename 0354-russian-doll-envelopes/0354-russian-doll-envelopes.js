var maxEnvelopes = function(envelopes) {
    // 너비 오름차순, 너비가 같으면 높이 내림차순
    envelopes.sort((a, b) => {
        if (a[0] !== b[0]) {
            return a[0] - b[0];
        }
        return b[1] - a[1];
    });

    const numEnvelopes = envelopes.length;

    const lisHeights = [envelopes[0][1]];

    for (let i = 1; i < numEnvelopes; i++) {
        const currentHeight = envelopes[i][1];

        // 현재 높이가 LIS의 마지막 값보다 크면 추가
        if (currentHeight > lisHeights[lisHeights.length - 1]) {
            lisHeights.push(currentHeight);
        } else {
            // lower bound로 교체할 위치 찾기
            const replaceIndex = lowerBound(
                lisHeights,
                currentHeight
            );

            lisHeights[replaceIndex] = currentHeight;
        }
    }

    return lisHeights.length;
};

function lowerBound(arr, target) {
    let left = 0;
    let right = arr.length;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}