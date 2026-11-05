var findTheDistanceValue = function(arr1, arr2, d) {
    // arr2를 오름차순으로 정렬
    arr2.sort((a, b) => a - b);

    let count = 0;

    // arr1의 각 원소 확인
    for (const element of arr1) {
        // element - d 이상의 첫 번째 원소 위치 탐색
        const index = binarySearchInsertionPoint(arr2, element - d);

        // 범위 내에 가까운 원소가 없으면 count 증가
        if (index === arr2.length || arr2[index] > element + d) {
            count++;
        }
    }

    return count;
};

var binarySearchInsertionPoint = function(sortedArray, target) {
    let left = 0;
    let right = sortedArray.length - 1;
    let firstTrueIndex = sortedArray.length;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (sortedArray[mid] >= target) {
            firstTrueIndex = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }

    return firstTrueIndex;
};