/**
 * @param matrix
 * @returns
 */
function setZeroes(matrix: number[][]): void {
    const row: number = matrix.length;
    const col: number = matrix[0].length;

    let firstRowZero: boolean = false;
    let firstColZero: boolean = false;

    // 첫 열 확인
    for (let i = 0; i < row; i++) {
        if (matrix[i][0] === 0) {
            firstColZero = true;
            break;
        }
    }

    // 첫 행 확인
    for (let j = 0; j < col; j++) {
        if (matrix[0][j] === 0) {
            firstRowZero = true;
            break;
        }
    }

    // 마킹
    for (let i = 1; i < row; i++) {
        for (let j = 1; j < col; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    // 내부 0 처리
    for (let i = 1; i < row; i++) {
        for (let j = 1; j < col; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }

    // 첫 열
    if (firstColZero) {
        for (let i = 0; i < row; i++) {
            matrix[i][0] = 0;
        }
    }

    // 첫 행
    if (firstRowZero) {
        for (let j = 0; j < col; j++) {
            matrix[0][j] = 0;
        }
    }
}