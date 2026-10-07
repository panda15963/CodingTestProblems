var countBattleships = function(board) {
    const rows = board.length;
    const cols = board[0].length;

    let battleshipCount = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] === '.') {
                continue;
            }

            if (
                row > 0 &&
                board[row - 1][col] === 'X'
            ) {
                continue;
            }

            if (
                col > 0 &&
                board[row][col - 1] === 'X'
            ) {
                continue;
            }

            battleshipCount++;
        }
    }

    return battleshipCount;
};