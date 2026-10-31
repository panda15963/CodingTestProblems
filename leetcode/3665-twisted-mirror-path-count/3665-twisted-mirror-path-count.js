/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePaths = function(grid) {
    const MOD = 1_000_000_007;

    const ROW = grid.length;
    const COL = grid[0].length;

    const memo = Array.from(
        { length: ROW },
        () => new Array(COL).fill(-1)
    );

    /**
     * Reflects the position while encountering obstacles.
     * direction: "right" or "down"
     */
    const reflect = (r, c, direction) => {
        while (
            r >= 0 && r < ROW &&
            c >= 0 && c < COL &&
            grid[r][c] === 1
        ) {
            if (direction === "right") {
                r++;
                direction = "down";
            } else {
                c++;
                direction = "right";
            }
        }

        return [r, c];
    };

    const dp = (r, c) => {
        if (
            r < 0 || r >= ROW ||
            c < 0 || c >= COL
        ) {
            return 0;
        }

        if (grid[r][c] === 1) {
            return 0;
        }

        if (r === ROW - 1 && c === COL - 1) {
            return 1;
        }

        if (memo[r][c] !== -1) {
            return memo[r][c];
        }

        let total = 0;

        // Move right
        let nR = r;
        let nC = c + 1;

        if (nC < COL) {
            if (grid[nR][nC] === 0) {
                total += dp(nR, nC);
            } else {
                const [reflectR, reflectC] =
                    reflect(nR + 1, nC, "down");

                if (
                    reflectR >= 0 && reflectR < ROW &&
                    reflectC >= 0 && reflectC < COL &&
                    grid[reflectR][reflectC] === 0
                ) {
                    total += dp(reflectR, reflectC);
                }
            }
        }

        // Move down
        nR = r + 1;
        nC = c;

        if (nR < ROW) {
            if (grid[nR][nC] === 0) {
                total += dp(nR, nC);
            } else {
                const [reflectR, reflectC] =
                    reflect(nR, nC + 1, "right");

                if (
                    reflectR >= 0 && reflectR < ROW &&
                    reflectC >= 0 && reflectC < COL &&
                    grid[reflectR][reflectC] === 0
                ) {
                    total += dp(reflectR, reflectC);
                }
            }
        }

        return memo[r][c] = total % MOD;
    };

    return dp(0, 0);
};