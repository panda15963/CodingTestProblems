function resultArray(nums) {
    // 첫 번째 배열
    const firstArray = [nums[0]];

    // 두 번째 배열
    const secondArray = [nums[1]];

    // 세 번째 원소부터 처리
    for (const currentElement of nums.slice(2)) {
        // 각 배열의 마지막 원소
        const lastElementFirst =
            firstArray[firstArray.length - 1];

        const lastElementSecond =
            secondArray[secondArray.length - 1];

        // 마지막 원소가 더 큰 배열에 추가
        if (lastElementFirst > lastElementSecond) {
            firstArray.push(currentElement);
        } else {
            secondArray.push(currentElement);
        }
    }

    // 두 배열을 합쳐서 반환
    return firstArray.concat(secondArray);
}