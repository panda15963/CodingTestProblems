class Group {
    start: number;
    length: number;

    constructor(start: number, length: number) {
        this.start = start;
        this.length = length;
    }
}

class SparseTable {
    private n: number;
    private st: number[][];

    constructor(nums: number[]) {
        this.n = nums.length;

        const levels = this.bitLength(this.n) + 1;

        this.st = Array.from(
            { length: levels },
            () => Array(this.n).fill(-Infinity)
        );

        for (let i = 0; i < this.n; i++) {
            this.st[0][i] = nums[i];
        }

        for (let i = 1; i < levels; i++) {
            const len = 1 << i;
            for (let j = 0; j + len <= this.n; j++) {
                this.st[i][j] = Math.max(
                    this.st[i - 1][j],
                    this.st[i - 1][j + (1 << (i - 1))]
                );
            }
        }
    }

    query(l: number, r: number): number {
        const k = this.bitLength(r - l + 1) - 1;

        return Math.max(
            this.st[k][l],
            this.st[k][r - (1 << k) + 1]
        );
    }

    private bitLength(n: number): number {
        return n === 0 ? 0 : 32 - Math.clz32(n);
    }
}

function maxActiveSectionsAfterTrade(
    s: string,
    queries: number[][]
): number[] {
    let ones = 0;

    for (const c of s) {
        if (c === '1') ones++;
    }

    const [zeroGroups, zeroGroupIndex] =
        getZeroGroups(s);

    if (zeroGroups.length === 0) {
        return Array(queries.length).fill(ones);
    }

    const st = new SparseTable(
        getZeroMergeLengths(zeroGroups)
    );

    const ans: number[] = [];

    for (const [l, r] of queries) {
        const left =
            zeroGroupIndex[l] === -1
                ? -1
                : zeroGroups[zeroGroupIndex[l]].length -
                  (l - zeroGroups[zeroGroupIndex[l]].start);

        const right =
            zeroGroupIndex[r] === -1
                ? -1
                : r -
                  zeroGroups[zeroGroupIndex[r]].start +
                  1;

        const [startAdjacentGroupIndex, endAdjacentGroupIndex] =
            mapToAdjacentGroupIndices(
                zeroGroupIndex[l] + 1,
                s[r] === '1'
                    ? zeroGroupIndex[r]
                    : zeroGroupIndex[r] - 1
            );

        let activeSections = ones;

        if (
            s[l] === '0' &&
            s[r] === '0' &&
            zeroGroupIndex[l] + 1 === zeroGroupIndex[r]
        ) {
            activeSections = Math.max(
                activeSections,
                ones + left + right
            );
        } else if (
            startAdjacentGroupIndex <=
            endAdjacentGroupIndex
        ) {
            activeSections = Math.max(
                activeSections,
                ones +
                    st.query(
                        startAdjacentGroupIndex,
                        endAdjacentGroupIndex
                    )
            );
        }

        if (
            s[l] === '0' &&
            zeroGroupIndex[l] + 1 <=
                (s[r] === '1'
                    ? zeroGroupIndex[r]
                    : zeroGroupIndex[r] - 1)
        ) {
            activeSections = Math.max(
                activeSections,
                ones +
                    left +
                    zeroGroups[
                        zeroGroupIndex[l] + 1
                    ].length
            );
        }

        if (
            s[r] === '0' &&
            zeroGroupIndex[l] <
                zeroGroupIndex[r] - 1
        ) {
            activeSections = Math.max(
                activeSections,
                ones +
                    right +
                    zeroGroups[
                        zeroGroupIndex[r] - 1
                    ].length
            );
        }

        ans.push(activeSections);
    }

    return ans;
}

function getZeroGroups(
    s: string
): [Group[], number[]] {
    const zeroGroups: Group[] = [];
    const zeroGroupIndex: number[] = Array(
        s.length
    ).fill(-1);

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '0') {
            if (i > 0 && s[i - 1] === '0') {
                zeroGroups[
                    zeroGroups.length - 1
                ].length++;
            } else {
                zeroGroups.push(
                    new Group(i, 1)
                );
            }
        }

        zeroGroupIndex[i] =
            zeroGroups.length - 1;
    }

    return [zeroGroups, zeroGroupIndex];
}

function getZeroMergeLengths(
    zeroGroups: Group[]
): number[] {
    const res: number[] = [];

    for (let i = 0; i + 1 < zeroGroups.length; i++) {
        res.push(
            zeroGroups[i].length +
                zeroGroups[i + 1].length
        );
    }

    return res;
}

function mapToAdjacentGroupIndices(
    startGroupIndex: number,
    endGroupIndex: number
): [number, number] {
    return [
        startGroupIndex,
        endGroupIndex - 1
    ];
}