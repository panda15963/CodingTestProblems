class Zuma {
    board: bigint;
    hand: bigint;

    constructor(board: bigint, hand: bigint) {
        this.board = board;
        this.hand = hand;
    }

    static create(boardStr: string, handStr: string): Zuma {
        return new Zuma(
            Zuma.encode(boardStr, false),
            Zuma.encode(handStr, true)
        );
    }

    getNextLevel(
        depth: number,
        visited: Set<string>
    ): Zuma[] | null {
        const next: Zuma[] = [];
        const handList = this.buildHandList();
        const boardList: bigint[] = new Array(32).fill(0n);
        const size = this.buildBoardList(boardList);

        for (const pair of handList) {
            const [ball, remainingHand] = pair;

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

    private pruningCheck(
        insBoard: bigint,
        ball: bigint,
        pos: number,
        depth: number
    ): bigint {
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

    private updateBoard(board: bigint): bigint {
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

    private buildHandList(): [bigint, bigint][] {
        const handList: [bigint, bigint][] = [];
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

    private buildBoardList(buffer: bigint[]): number {
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

    private static encode(
        stateStr: string,
        sortFlag: boolean
    ): bigint {
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

    private static encodeChar(ch: string): bigint {
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

function findMinStep(board: string, hand: string): number {
    const zuma = Zuma.create(board, hand);
    const visited = new Set<string>([zuma.board.toString()]);

    return bfs([zuma], 0, visited);
}

function bfs(
    curr: Zuma[],
    k: number,
    visited: Set<string>
): number {
    if (curr.length === 0) {
        return -1;
    }

    const next: Zuma[] = [];

    for (const zuma of curr) {
        const neib = zuma.getNextLevel(k, visited);

        if (neib === null) {
            return k + 1;
        }

        next.push(...neib);
    }

    return bfs(next, k + 1, visited);
}