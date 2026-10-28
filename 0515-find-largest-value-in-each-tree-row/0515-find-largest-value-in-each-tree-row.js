var largestValues = function(root) {
    const result = [];

    if (!root) {
        return result;
    }

    let currentLevelQueue = [root];

    while (currentLevelQueue.length > 0) {
        const nextLevelQueue = [];
        let maxValueInLevel = -Infinity;

        for (const node of currentLevelQueue) {
            maxValueInLevel = Math.max(maxValueInLevel, node.val);

            if (node.left) {
                nextLevelQueue.push(node.left);
            }

            if (node.right) {
                nextLevelQueue.push(node.right);
            }
        }

        result.push(maxValueInLevel);
        currentLevelQueue = nextLevelQueue;
    }

    return result;
};