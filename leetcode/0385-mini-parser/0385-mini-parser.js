var deserialize = function(s) {
    if (s === '' || s === '[]') {
        return new NestedInteger();
    }

    if (s[0] !== '[') {
        return new NestedInteger(Number(s));
    }

    const result = new NestedInteger();
    let bracketDepth = 0;

    for (
        let currentIndex = 1, startIndex = 1;
        currentIndex < s.length;
        currentIndex++
    ) {
        if (
            bracketDepth === 0 &&
            (
                s[currentIndex] === ',' ||
                currentIndex === s.length - 1
            )
        ) {
            result.add(
                deserialize(
                    s.slice(startIndex, currentIndex)
                )
            );

            startIndex = currentIndex + 1;
        } else if (s[currentIndex] === '[') {
            bracketDepth++;
        } else if (s[currentIndex] === ']') {
            bracketDepth--;
        }
    }

    return result;
};