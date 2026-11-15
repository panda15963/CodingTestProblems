/**
 * Finds common restaurants between two lists with minimum index sum
 * @param {string[]} list1 - First array of restaurant names
 * @param {string[]} list2 - Second array of restaurant names
 * @returns {string[]} Array of restaurant names with minimum index sum
 */
function findRestaurant(list1, list2) {
    // list2의 레스토랑 이름과 인덱스를 Map에 저장
    const restaurantIndexMap = new Map(
        list2.map((restaurant, index) => [restaurant, index])
    );

    // 현재까지 발견한 최소 인덱스 합
    let minimumIndexSum = Infinity;

    // 최소 인덱스 합을 가진 레스토랑 저장
    const result = [];

    // list1을 순회하면서 공통 레스토랑 탐색
    list1.forEach((restaurant, indexInList1) => {
        // 현재 레스토랑이 list2에도 존재하는지 확인
        if (restaurantIndexMap.has(restaurant)) {
            // list2에서 해당 레스토랑의 인덱스 가져오기
            const indexInList2 = restaurantIndexMap.get(restaurant);

            // 두 인덱스의 합 계산
            const currentIndexSum = indexInList1 + indexInList2;

            // 더 작은 인덱스 합을 발견한 경우
            if (currentIndexSum < minimumIndexSum) {
                minimumIndexSum = currentIndexSum;
                result.length = 0;
                result.push(restaurant);
            }
            // 최소 인덱스 합이 동일한 경우
            else if (currentIndexSum === minimumIndexSum) {
                result.push(restaurant);
            }
        }
    });

    return result;
}