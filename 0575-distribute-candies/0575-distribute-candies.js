var distributeCandies = function(candyType) {
    // 중복되지 않는 사탕 종류 저장
    const uniqueCandyTypes = new Set(candyType);

    // 앨리스가 먹을 수 있는 최대 사탕 개수
    const maxCandiesAliceCanEat = candyType.length >> 1;

    // 서로 다른 사탕 종류 수와 먹을 수 있는 사탕 개수 중 작은 값 반환
    return Math.min(
        uniqueCandyTypes.size,
        maxCandiesAliceCanEat
    );
};