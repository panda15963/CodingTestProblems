function solution(board) {
    const n = board.length;
    const deltas = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
    
    let safe = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 1) continue;  // 지뢰면 스킵
            
            let danger = false;
            for (const [di, dj] of deltas) {
                const ni = i + di, nj = j + dj;
                if (ni >= 0 && ni < n && nj >= 0 && nj < n && board[ni][nj] === 1) {
                    danger = true;
                    break;
                }
            }
            if (!danger) safe++;
        }
    }
    return safe;
}