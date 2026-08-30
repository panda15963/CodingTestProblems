var minimumDeletions = function(nums) {
    const arrayLength = nums.length;

    // 원소가 하나뿐인 경우
    if (arrayLength === 1) {
        return 1;
    }

    // 최소값과 최대값의 인덱스 찾기
    const minElementIndex = nums.indexOf(Math.min(...nums));
    const maxElementIndex = nums.indexOf(Math.max(...nums));

    // 최소값과 최대값 중 왼쪽에 있는 인덱스
    const leftmostIndex = Math.min(
        minElementIndex,
        maxElementIndex
    );

    // 최소값과 최대값 중 오른쪽에 있는 인덱스
    const rightmostIndex = Math.max(
        minElementIndex,
        maxElementIndex
    );

    // 방법 1: 왼쪽에서 하나, 오른쪽에서 하나 제거
    const deleteFromBothEnds =
        (leftmostIndex + 1) +
        (arrayLength - rightmostIndex);

    // 방법 2: 왼쪽에서만 제거
    const deleteFromLeftOnly =
        rightmostIndex + 1;

    // 방법 3: 오른쪽에서만 제거
    const deleteFromRightOnly =
        arrayLength - leftmostIndex;

    // 세 가지 방법 중 최소값
    return Math.min(
        deleteFromBothEnds,
        deleteFromLeftOnly,
        deleteFromRightOnly
    );
};