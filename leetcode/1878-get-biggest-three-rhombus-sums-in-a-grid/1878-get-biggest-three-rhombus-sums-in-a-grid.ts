function getBiggestThree(grid: number[][]): number[] {

    const m = grid.length
    const n = grid[0].length

    const set = new Set<number>()

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {

            // size = 0
            set.add(grid[r][c])

            // 최대 size
            for (let k = 1; ; k++) {

                if (r - k < 0 || r + k >= m || c - k < 0 || c + k >= n)
                    break

                let sum = 0

                let x = r - k
                let y = c

                // top → right
                for (let i = 0; i < k; i++) {
                    sum += grid[x + i][y + i]
                }

                // right → bottom
                for (let i = 0; i < k; i++) {
                    sum += grid[r + i][c + k - i]
                }

                // bottom → left
                for (let i = 0; i < k; i++) {
                    sum += grid[r + k - i][c - i]
                }

                // left → top
                for (let i = 0; i < k; i++) {
                    sum += grid[r - i][c - k + i]
                }

                set.add(sum)
            }
        }
    }

    const arr = Array.from(set).sort((a, b) => b - a)

    return arr.slice(0, 3)
}