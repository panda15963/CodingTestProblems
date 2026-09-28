var maxDepth = function(s) {
    let maxDepthFound = 0;
    let currentDepth = 0;

    for (const character of s) {
        if (character === '(') {
            currentDepth++;
            maxDepthFound = Math.max(
                maxDepthFound,
                currentDepth
            );
        } else if (character === ')') {
            currentDepth--;
        }
    }

    return maxDepthFound;
};