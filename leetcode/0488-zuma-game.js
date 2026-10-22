var findMinStep = function(board, hand) {
    const zuma = Zuma.create(board, hand);
    const visited = new Set([zuma.board.toString()]);

    return bfs([zuma], 0, visited);
};

function bfs(curr, k, visited) {
    if (curr.length === 0) {
        return -1;
    }

    const next = [];

    for (const zuma of curr) {
        const neib = zuma.getNextLevel(k, visited);

        if (neib === null) {
            return k + 1;
        }

        next.push(...neib);
    }

    return bfs(next, k + 1, visited);
}

class Zuma {
    constructor(board, hand) {
        this.board = board;
        this.hand = hand;
    }

    static create(boardStr, handStr) {
        return new Zuma(
            Zuma.encode(boardStr, false),
            Zuma.encode(handStr, true)
        );
    }

    getNextLevel(depth, visited) {
        const next = [];
        const handList = this.buildHandList();
        const boardList = new Array(32).fill(0n);
        const size = this.buildBoardList(boardList);

        for (const pair of handList) {
            const ball = pair[0];
            const remainingHand = pair[1];

            for (let i = 0; i < size; ++i) {
                const rawBoard = this.pruningCheck(
                    boardList[i], ball, i * 3, depth
                );

                if (rawBoard === -1n) {
                    continue;
                }

                const nextBoard = this.updateBoard(rawBoard);

                if (nextBoard === 0n) {
                    return null;
                }

                const key = nextBoard.toString();

                if (remainingHand === 0n || visited.has(key)) {
                    continue;
                }

                visited.add(key);
                next.push(new Zuma(nextBoard, remainingHand));
            }
        }

        return next;
    }

    pruningCheck(insBoard, ball, pos, depth) {
        const L = (insBoard >> BigInt((pos + 3) & 63)) & 7n;
        const R = (insBoard >> BigInt((pos - 3) & 63)) & 7n;

        if (
            (depth === 0 && ball !== R && L !== R) ||
            (depth > 0 && ball !== R)
        ) {
            return -1n;
        }

        return insBoard | (ball << BigInt(pos));
    }

    updateBoard(board) {
        let stack = 0n;

        for (let i = 0; i < 64; i += 3) {
            const curr = (board >> BigInt(i)) & 7n;
            const top = stack & 7n;

            if (
                top > 0n &&
                curr !== top &&
                (stack & 63n) === ((stack >> 3n) & 63n)
            ) {
                stack >>= 9n;

                if ((stack & 7n) === top) {
                    stack >>= 3n;
                }
            }

            if (curr === 0n) {
                break;
            }

            stack = (stack << 3n) | curr;
        }

        return stack;
    }

    buildHandList() {
        const handList = [];
        let prevBall = 0n;
        let ballMask = 0n;

        for (let i = 0; i < 16; i += 3) {
            const currBall = (this.hand >> BigInt(i)) & 7n;

            if (currBall === 0n) {
                break;
            }

            if (currBall !== prevBall) {
                prevBall = currBall;

                handList.push([
                    currBall,
                    ((this.hand >> 3n) & ~ballMask) |
                        (this.hand & ballMask)
                ]);
            }

            ballMask = (ballMask << 3n) | 7n;
        }

        return handList;
    }

    buildBoardList(buffer) {
        let ptr = 0;
        let ballMask = 7n;
        let insBoard = this.board << 3n;

        buffer[ptr++] = insBoard;

        while (true) {
            const currBall = this.board & ballMask;

            if (currBall === 0n) {
                break;
            }

            ballMask <<= 3n;
            insBoard = (insBoard | currBall) & ~ballMask;
            buffer[ptr++] = insBoard;
        }

        return ptr;
    }

    static encode(stateStr, sortFlag) {
        let chars = [...stateStr];

        if (sortFlag) {
            chars.sort();
        }

        let stateBits = 0n;

        for (const ch of chars) {
            stateBits = (stateBits << 3n) | Zuma.encodeChar(ch);
        }

        return stateBits;
    }

    static encodeChar(ch) {
        switch (ch) {
            case 'R': return 1n;
            case 'G': return 2n;
            case 'B': return 3n;
            case 'W': return 4n;
            case 'Y': return 5n;
            case ' ': return 0n;
            default:
                throw new Error("Invalid char: " + ch);
        }
    }
}