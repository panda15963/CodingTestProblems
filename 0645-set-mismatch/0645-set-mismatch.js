var findErrorNums = function(nums) {
    // 배열 길이
    const arrayLength = nums.length;

    // 1부터 n까지의 기대 합
    const expectedSum = (arrayLength * (arrayLength + 1)) / 2;

    // 중복을 제거한 원소들의 합
    const uniqueElementsSum = [...new Set(nums)].reduce(
        (accumulator, current) => accumulator + current,
        0
    );

    // 중복을 포함한 실제 합
    const actualSum = nums.reduce(
        (accumulator, current) => accumulator + current,
        0
    );

    // [중복 숫자, 누락 숫자]
    return [
        actualSum - uniqueElementsSum,
        expectedSum - uniqueElementsSum
    ];
};