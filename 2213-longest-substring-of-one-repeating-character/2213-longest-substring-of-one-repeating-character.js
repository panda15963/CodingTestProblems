/**
 * Node structure for segment tree
 */
let charArray;
let segmentTree;

/**
 * Builds the segment tree
 */
function build(nodeIndex, leftBound, rightBound) {
    segmentTree[nodeIndex] = {
        left: leftBound,
        right: rightBound,
        leftMax: 1,
        rightMax: 1,
        max: 1
    };

    // Leaf node
    if (leftBound === rightBound) {
        return;
    }

    const mid = (leftBound + rightBound) >> 1;
    const leftChildIndex = nodeIndex << 1;
    const rightChildIndex = (nodeIndex << 1) | 1;

    build(leftChildIndex, leftBound, mid);
    build(rightChildIndex, mid + 1, rightBound);

    pushup(nodeIndex);
}

/**
 * Updates parent node information
 */
function pushup(nodeIndex) {
    const currentNode = segmentTree[nodeIndex];
    const leftChild = segmentTree[nodeIndex << 1];
    const rightChild = segmentTree[(nodeIndex << 1) | 1];

    currentNode.max = Math.max(leftChild.max, rightChild.max);

    currentNode.leftMax = leftChild.leftMax;
    currentNode.rightMax = rightChild.rightMax;

    const leftSegmentLength =
        leftChild.right - leftChild.left + 1;

    const rightSegmentLength =
        rightChild.right - rightChild.left + 1;

    // Check characters at the boundary
    if (
        charArray[leftChild.right - 1] ===
        charArray[rightChild.left - 1]
    ) {
        // Left segment is entirely the same character
        if (leftChild.leftMax === leftSegmentLength) {
            currentNode.leftMax += rightChild.leftMax;
        }

        // Right segment is entirely the same character
        if (rightChild.rightMax === rightSegmentLength) {
            currentNode.rightMax += leftChild.rightMax;
        }

        // Sequence crossing the boundary
        currentNode.max = Math.max(
            currentNode.max,
            leftChild.rightMax + rightChild.leftMax
        );
    }
}

/**
 * Modifies a character at a specific position
 * position is 1-indexed
 */
function modify(nodeIndex, position, newChar) {
    const currentNode = segmentTree[nodeIndex];

    // Leaf node
    if (
        currentNode.left === position &&
        currentNode.right === position
    ) {
        charArray[position - 1] = newChar;
        return;
    }

    const mid =
        (currentNode.left + currentNode.right) >> 1;

    const leftChildIndex = nodeIndex << 1;
    const rightChildIndex = (nodeIndex << 1) | 1;

    if (position <= mid) {
        modify(leftChildIndex, position, newChar);
    } else {
        modify(rightChildIndex, position, newChar);
    }

    pushup(nodeIndex);
}

/**
 * Queries the maximum repeating length in a range
 */
function query(nodeIndex, queryLeft, queryRight) {
    const currentNode = segmentTree[nodeIndex];

    // Completely inside query range
    if (
        currentNode.left >= queryLeft &&
        currentNode.right <= queryRight
    ) {
        return currentNode.max;
    }

    const mid =
        (currentNode.left + currentNode.right) >> 1;

    const leftChildIndex = nodeIndex << 1;
    const rightChildIndex = (nodeIndex << 1) | 1;

    // Entirely in left subtree
    if (queryRight <= mid) {
        return query(
            leftChildIndex,
            queryLeft,
            queryRight
        );
    }

    // Entirely in right subtree
    if (queryLeft > mid) {
        return query(
            rightChildIndex,
            queryLeft,
            queryRight
        );
    }

    // Spans both subtrees
    return Math.max(
        query(leftChildIndex, queryLeft, queryRight),
        query(rightChildIndex, queryLeft, queryRight)
    );
}

/**
 * Main function
 *
 * @param {string} s
 * @param {string} queryCharacters
 * @param {number[]} queryIndices
 * @returns {number[]}
 */
function longestRepeating(
    s,
    queryCharacters,
    queryIndices
) {
    charArray = s.split('');

    const stringLength = s.length;

    // Segment tree
    segmentTree = new Array(stringLength * 4);

    // Build tree
    build(1, 1, stringLength);

    const queryCount = queryIndices.length;
    const results = new Array(queryCount);

    // Process each query
    for (let i = 0; i < queryCount; i++) {
        // queryIndices is 0-indexed,
        // segment tree uses 1-indexed positions
        const updatePosition = queryIndices[i] + 1;
        const updateChar = queryCharacters[i];

        // Update character
        modify(
            1,
            updatePosition,
            updateChar
        );

        // Query the entire string
        results[i] = query(
            1,
            1,
            stringLength
        );
    }

    return results;
}