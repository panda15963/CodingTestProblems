function matrixReshape(mat: number[][], r: number, c: number): number[][] {
    const originalRows = mat.length;
    const originalCols = mat[0].length;

    // 전체 원소 개수가 같지 않으면 원본 행렬 반환
    if (originalRows * originalCols !== r * c) {
        return mat;
    }

    // 새로운 행렬 생성
    const reshapedMatrix: number[][] = Array.from(
        { length: r },
        () => new Array(c).fill(0)
    );

    const totalElements = originalRows * originalCols;

    for (let index = 0; index < totalElements; index++) {
        // 기존 행렬의 위치
        const sourceRow = Math.floor(index / originalCols);
        const sourceCol = index % originalCols;

        // 새로운 행렬의 위치
        const targetRow = Math.floor(index / c);
        const targetCol = index % c;

        reshapedMatrix[targetRow][targetCol] = mat[sourceRow][sourceCol];
    }

    return reshapedMatrix;
}