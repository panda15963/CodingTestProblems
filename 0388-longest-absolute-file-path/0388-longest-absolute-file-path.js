var lengthLongestPath = function(input) {
    let index = 0;
    const inputLength = input.length;
    let maxPathLength = 0;
    const pathLengthStack = [];

    while (index < inputLength) {
        let indentLevel = 0;

        while (
            index < inputLength &&
            input[index] === '\t'
        ) {
            indentLevel++;
            index++;
        }

        let currentNameLength = 0;
        let isFile = false;

        while (
            index < inputLength &&
            input[index] !== '\n'
        ) {
            currentNameLength++;

            if (input[index] === '.') {
                isFile = true;
            }

            index++;
        }

        index++;

        while (
            pathLengthStack.length > 0 &&
            pathLengthStack.length > indentLevel
        ) {
            pathLengthStack.pop();
        }

        let cumulativePathLength = currentNameLength;

        if (pathLengthStack.length > 0) {
            cumulativePathLength +=
                pathLengthStack[pathLengthStack.length - 1] + 1;
        }

        if (!isFile) {
            pathLengthStack.push(cumulativePathLength);
            continue;
        }

        maxPathLength = Math.max(
            maxPathLength,
            cumulativePathLength
        );
    }

    return maxPathLength;
};