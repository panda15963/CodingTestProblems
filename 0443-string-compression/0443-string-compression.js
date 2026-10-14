var compress = function(chars) {
    let writeIndex = 0;
    const arrayLength = chars.length;

    let readIndex = 0;

    while (readIndex < arrayLength) {
        let nextIndex = readIndex + 1;

        while (
            nextIndex < arrayLength &&
            chars[nextIndex] === chars[readIndex]
        ) {
            nextIndex++;
        }

        chars[writeIndex++] = chars[readIndex];

        const groupSize = nextIndex - readIndex;

        if (groupSize > 1) {
            const countStr = groupSize.toString();

            for (const digit of countStr) {
                chars[writeIndex++] = digit;
            }
        }

        readIndex = nextIndex;
    }

    return writeIndex;
};