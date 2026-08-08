/**
 * Definition for Node.
 * function Node(val, left, right, next) {
 *     this.val = (val === undefined ? 0 : val);
 *     this.left = (left === undefined ? null : left);
 *     this.right = (right === undefined ? null : right);
 *     this.next = (next === undefined ? null : next);
 * }
 */

/**
 * Connects each node to its next right node in the same level.
 * Uses BFS (level-order traversal).
 *
 * @param {Node|null} root
 * @return {Node|null}
 */
var connect = function (root) {
    // Empty tree
    if (!root) {
        return null;
    }

    // Queue for current level
    const currentLevelQueue = [root];

    // Process level by level
    while (currentLevelQueue.length > 0) {
        // Queue for next level
        const nextLevelQueue = [];

        // Previous node in current level
        let previousNode = null;

        // Process current level
        for (const currentNode of currentLevelQueue) {
            // Connect previous node to current node
            if (previousNode) {
                previousNode.next = currentNode;
            }

            previousNode = currentNode;

            // Add children to next level
            if (currentNode.left) {
                nextLevelQueue.push(currentNode.left);
            }

            if (currentNode.right) {
                nextLevelQueue.push(currentNode.right);
            }
        }

        // Last node of each level must point to null
        if (previousNode) {
            previousNode.next = null;
        }

        // Move to next level
        currentLevelQueue.splice(
            0,
            currentLevelQueue.length,
            ...nextLevelQueue
        );
    }

    return root;
};