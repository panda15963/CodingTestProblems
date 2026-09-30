var maxDepthAfterSplit = function(seq) {
    const sequenceLength = seq.length;
    const result = new Array(sequenceLength);

    let currentDepth = 0;

    for (let index = 0; index < sequenceLength; index++) {
        if (seq[index] === '(') {
            result[index] = currentDepth & 1;
            currentDepth++;
        } else {
            currentDepth--;
            result[index] = currentDepth & 1;
        }
    }

    return result;
};