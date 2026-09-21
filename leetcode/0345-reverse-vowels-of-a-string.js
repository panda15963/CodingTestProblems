/**
 * @param {string} s
 * @return {string}
 */
function reverseVowels(s) {
    const vowelSet = new Set([
        'a', 'e', 'i', 'o', 'u',
        'A', 'E', 'I', 'O', 'U'
    ]);

    const charArray = s.split('');

    let leftPointer = 0;
    let rightPointer = charArray.length - 1;

    while (leftPointer < rightPointer) {
        while (
            leftPointer < rightPointer &&
            !vowelSet.has(charArray[leftPointer])
        ) {
            leftPointer++;
        }

        while (
            leftPointer < rightPointer &&
            !vowelSet.has(charArray[rightPointer])
        ) {
            rightPointer--;
        }

        if (leftPointer < rightPointer) {
            [charArray[leftPointer], charArray[rightPointer]] =
                [charArray[rightPointer], charArray[leftPointer]];

            leftPointer++;
            rightPointer--;
        }
    }

    return charArray.join('');
}