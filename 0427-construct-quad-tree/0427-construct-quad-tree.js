var construct = function(grid) {
    const n = grid.length;

    return buildQuadTree(
        0,
        0,
        n - 1,
        n - 1,
        grid
    );
};

function buildQuadTree(
    rowStart,
    colStart,
    rowEnd,
    colEnd,
    grid
) {
    let hasZero = false;
    let hasOne = false;

    // 현재 영역이 모두 같은 값인지 확인
    for (let row = rowStart; row <= rowEnd; row++) {
        for (let col = colStart; col <= colEnd; col++) {
            if (grid[row][col] === 1) {
                hasOne = true;
            } else {
                hasZero = true;
            }

            if (hasZero && hasOne) {
                break;
            }
        }

        if (hasZero && hasOne) {
            break;
        }
    }

    const isLeaf = !(hasZero && hasOne);
    const nodeValue = isLeaf && hasOne;

    // LeetCode에서 제공하는 Node 사용
    const currentNode = new Node(
        nodeValue,
        isLeaf
    );

    // 모두 같은 값이면 Leaf Node
    if (isLeaf) {
        return currentNode;
    }

    const rowMid = Math.floor(
        (rowStart + rowEnd) / 2
    );

    const colMid = Math.floor(
        (colStart + colEnd) / 2
    );

    // Top Left
    currentNode.topLeft = buildQuadTree(
        rowStart,
        colStart,
        rowMid,
        colMid,
        grid
    );

    // Top Right
    currentNode.topRight = buildQuadTree(
        rowStart,
        colMid + 1,
        rowMid,
        colEnd,
        grid
    );

    // Bottom Left
    currentNode.bottomLeft = buildQuadTree(
        rowMid + 1,
        colStart,
        rowEnd,
        colMid,
        grid
    );

    // Bottom Right
    currentNode.bottomRight = buildQuadTree(
        rowMid + 1,
        colMid + 1,
        rowEnd,
        colEnd,
        grid
    );

    return currentNode;
}