const checkWin = (board, shape) => {
    if (board[0][0]===shape) {
        if (board[0][1]===shape && board[0][2]===shape) return true;
        if (board[1][1]===shape && board[2][2]===shape) return true;
        if (board[1][0]===shape && board[2][0]===shape) return true;
    }
    if (board[0][1]===shape && board[1][1]===shape && board[2][1]===shape) return true;
    if (board[0][2]===shape && board[1][2]===shape && board[2][2]===shape) return true;
    if (board[1][0]===shape && board[1][1]===shape && board[1][2]===shape) return true;
    if (board[2][0]===shape && board[2][1]===shape && board[2][2]===shape) return true;
    if (board[0][2]===shape && board[1][1]===shape && board[2][0]===shape) return true;
    
    return false;
}

function solution(board) {
    const flatBoard = board.reduce((acc, cur) => [...acc, ...cur]);
    const oCnt = flatBoard.filter(val => val === 'O').length;
    const xCnt = flatBoard.filter(val => val === 'X').length;
    const owin = checkWin(board, 'O');
    const xwin = checkWin(board, 'X');
    
    if (oCnt < xCnt) return 0;
    if (owin && oCnt <= xCnt) return 0;
    if (xwin && xCnt < oCnt) return 0;
    if (oCnt - xCnt >= 2) return 0;
    
    return 1;
}