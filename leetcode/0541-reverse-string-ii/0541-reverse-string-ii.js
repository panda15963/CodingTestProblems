var reverseStr = function(s, k) {
    const length = s.length;
    const charArray = s.split('');

    // 2k 단위로 순회
    for (let startIndex = 0; startIndex < length; startIndex += 2 * k) {
        let leftPointer = startIndex;
        let rightPointer = Math.min(startIndex + k - 1, length - 1);

        // 양쪽 포인터를 이용해 문자 뒤집기
        while (leftPointer < rightPointer) {
            [charArray[leftPointer], charArray[rightPointer]] =
                [charArray[rightPointer], charArray[leftPointer]];

            leftPointer++;
            rightPointer--;
        }
    }

    return charArray.join('');
};