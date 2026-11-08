var findUnsortedSubarray = function(nums) {
    // 원본 배열을 복사한 후 오름차순 정렬
    const sortedArray = [...nums];
    sortedArray.sort((a, b) => a - b);

    // 왼쪽과 오른쪽 포인터 초기화
    let leftIndex = 0;
    let rightIndex = sortedArray.length - 1;

    // 왼쪽부터 원본 배열과 정렬된 배열이 다른 위치 탐색
    while (
        leftIndex <= rightIndex &&
        sortedArray[leftIndex] === nums[leftIndex]
    ) {
        leftIndex++;
    }

    // 오른쪽부터 원본 배열과 정렬된 배열이 다른 위치 탐색
    while (
        leftIndex <= rightIndex &&
        sortedArray[rightIndex] === nums[rightIndex]
    ) {
        rightIndex--;
    }

    // 정렬이 필요한 구간의 길이 반환
    return rightIndex - leftIndex + 1;
};