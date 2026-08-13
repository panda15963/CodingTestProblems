// Node structure for segment tree
interface SegmentNode {
    left: number;      // Left boundary of the segment
    right: number;     // Right boundary of the segment
    leftMax: number;   // Maximum repeating length starting from left boundary
    rightMax: number;  // Maximum repeating length ending at right boundary
    max: number;       // Maximum repeating length within this segment
}

// Global variables for the segment tree
let charArray: string[];        // Character array representation of the string
let segmentTree: SegmentNode[]; // Segment tree array

/**
 * Builds the segment tree recursively
 * @param nodeIndex - Current node index in the tree
 * @param leftBound - Left boundary of current segment
 * @param rightBound - Right boundary of current segment
 */
function build(nodeIndex: number, leftBound: number, rightBound: number): void {
    // Initialize current node with boundaries and default max values of 1
    segmentTree[nodeIndex] = {
        left: leftBound,
        right: rightBound,
        leftMax: 1,
        rightMax: 1,
        max: 1
    };
  
    // Base case: leaf node
    if (leftBound === rightBound) {
        return;
    }
  
    // Recursively build left and right subtrees
    const mid = (leftBound + rightBound) >> 1;
    const leftChildIndex = nodeIndex << 1;
    const rightChildIndex = (nodeIndex << 1) | 1;
  
    build(leftChildIndex, leftBound, mid);
    build(rightChildIndex, mid + 1, rightBound);
  
    // Update current node based on children
    pushup(nodeIndex);
}

/**
 * Updates parent node information based on its children
 * @param nodeIndex - Index of the node to update
 */
function pushup(nodeIndex: number): void {
    const currentNode = segmentTree[nodeIndex];
    const leftChild = segmentTree[nodeIndex << 1];
    const rightChild = segmentTree[(nodeIndex << 1) | 1];
  
    // Update max repeating length from children
    currentNode.max = Math.max(leftChild.max, rightChild.max);
  
    // Initially, inherit boundary max values from children
    currentNode.leftMax = leftChild.leftMax;
    currentNode.rightMax = rightChild.rightMax;
  
    // Calculate segment lengths
    const leftSegmentLength = leftChild.right - leftChild.left + 1;
    const rightSegmentLength = rightChild.right - rightChild.left + 1;
  
    // Check if characters at the boundary between left and right segments are the same
    if (charArray[leftChild.right - 1] === charArray[rightChild.left - 1]) {
        // If left child is entirely repeating, extend leftMax into right child
        if (leftChild.leftMax === leftSegmentLength) {
            currentNode.leftMax += rightChild.leftMax;
        }
      
        // If right child is entirely repeating, extend rightMax into left child
        if (rightChild.rightMax === rightSegmentLength) {
            currentNode.rightMax += leftChild.rightMax;
        }
      
        // Update max considering the merge at boundary
        currentNode.max = Math.max(currentNode.max, leftChild.rightMax + rightChild.leftMax);
    }
}

/**
 * Modifies a character at a specific position
 * @param nodeIndex - Current node index in the tree
 * @param position - Position to modify (1-indexed)
 * @param newChar - New character value
 */
function modify(nodeIndex: number, position: number, newChar: string): void {
    const currentNode = segmentTree[nodeIndex];
  
    // Base case: reached the target leaf node
    if (currentNode.left === position && currentNode.right === position) {
        charArray[position - 1] = newChar;
        return;
    }
  
    // Recursively modify in appropriate subtree
    const mid = (currentNode.left + currentNode.right) >> 1;
    const leftChildIndex = nodeIndex << 1;
    const rightChildIndex = (nodeIndex << 1) | 1;
  
    if (position <= mid) {
        modify(leftChildIndex, position, newChar);
    } else {
        modify(rightChildIndex, position, newChar);
    }
  
    // Update current node after modification
    pushup(nodeIndex);
}

/**
 * Queries the maximum repeating length in a range
 * @param nodeIndex - Current node index in the tree
 * @param queryLeft - Left boundary of query range
 * @param queryRight - Right boundary of query range
 * @returns Maximum repeating length in the range
 */
function query(nodeIndex: number, queryLeft: number, queryRight: number): number {
    const currentNode = segmentTree[nodeIndex];
  
    // Current segment is completely within query range
    if (currentNode.left >= queryLeft && currentNode.right <= queryRight) {
        return currentNode.max;
    }
  
    const mid = (currentNode.left + currentNode.right) >> 1;
    const leftChildIndex = nodeIndex << 1;
    const rightChildIndex = (nodeIndex << 1) | 1;
  
    let result = 0;
  
    // Query is entirely in left subtree
    if (queryRight <= mid) {
        result = query(leftChildIndex, queryLeft, queryRight);
    }
    // Query is entirely in right subtree
    else if (queryLeft > mid) {
        result = Math.max(result, query(rightChildIndex, queryLeft, queryRight));
    }
    // Query spans both subtrees
    else {
        result = Math.max(
            query(leftChildIndex, queryLeft, queryRight),
            query(rightChildIndex, queryLeft, queryRight)
        );
    }
  
    return result;
}

/**
 * Main function to process queries and return longest repeating substring lengths
 * @param s - Input string
 * @param queryCharacters - Characters to update at each query
 * @param queryIndices - Indices to update at each query (0-indexed)
 * @returns Array of maximum repeating lengths after each query
 */
function longestRepeating(s: string, queryCharacters: string, queryIndices: number[]): number[] {
    // Initialize global variables
    charArray = s.split('');
    const stringLength = s.length;
    segmentTree = Array(stringLength * 4)
        .fill(null)
        .map(() => ({ left: 0, right: 0, leftMax: 1, rightMax: 1, max: 1 }));
  
    // Build the segment tree
    build(1, 1, stringLength);
  
    // Process queries
    const queryCount = queryIndices.length;
    const results: number[] = new Array(queryCount);
  
    for (let i = 0; i < queryCount; i++) {
        // Convert to 1-indexed position
        const updatePosition = queryIndices[i] + 1;
        const updateChar = queryCharacters[i];
      
        // Modify the character at the specified position
        modify(1, updatePosition, updateChar);
      
        // Query the entire range for maximum repeating length
        results[i] = query(1, 1, stringLength);
    }
  
    return results;
}