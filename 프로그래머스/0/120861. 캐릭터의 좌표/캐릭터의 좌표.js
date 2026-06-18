function solution(keyinput, board) {
    const pos = [0, 0];
    const maxX = (board[0] - 1) / 2;
    const maxY = (board[1] - 1) / 2;

    for (const k of keyinput) {
        if (k === "up" && pos[1] < maxY) {
            pos[1]++;
        } else if (k === "down" && pos[1] > -maxY) {
            pos[1]--;
        } else if (k === "right" && pos[0] < maxX) {
            pos[0]++;
        } else if (k === "left" && pos[0] > -maxX) {
            pos[0]--;
        }
    }

    return pos;
}