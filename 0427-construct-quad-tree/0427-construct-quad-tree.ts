function construct(grid: number[][]): Node | null {
    const n = grid.length;

    return buildQuadTree(
        0,
        0,
        n - 1,
        n - 1,
        grid
    );
}

function buildQuadTree(
    rowStart: number,
    colStart: number,
    rowEnd: number,
    colEnd: number,
    grid: number[][]
): Node {
    let hasZero = false;
    let hasOne = false;

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

    const currentNode = new Node(
        nodeValue,
        isLeaf
    );

    if (isLeaf) {
        return currentNode;
    }

    const rowMid = Math.floor(
        (rowStart + rowEnd) / 2
    );

    const colMid = Math.floor(
        (colStart + colEnd) / 2
    );

    currentNode.topLeft = buildQuadTree(
        rowStart,
        colStart,
        rowMid,
        colMid,
        grid
    );

    currentNode.topRight = buildQuadTree(
        rowStart,
        colMid + 1,
        rowMid,
        colEnd,
        grid
    );

    currentNode.bottomLeft = buildQuadTree(
        rowMid + 1,
        colStart,
        rowEnd,
        colMid,
        grid
    );

    currentNode.bottomRight = buildQuadTree(
        rowMid + 1,
        colMid + 1,
        rowEnd,
        colEnd,
        grid
    );

    return currentNode;
}