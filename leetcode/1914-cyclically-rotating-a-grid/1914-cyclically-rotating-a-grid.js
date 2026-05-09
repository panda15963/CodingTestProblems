function rotateGrid(grid, k) {
    const rowCount = grid.length;
    const colCount = grid[0].length;

    const rotateLayer = (layerIndex, rotations) => {
        const elements = [];

        for (let col = layerIndex; col < colCount - layerIndex - 1; col++) {
            elements.push(grid[layerIndex][col]);
        }

        for (let row = layerIndex; row < rowCount - layerIndex - 1; row++) {
            elements.push(grid[row][colCount - layerIndex - 1]);
        }

        for (let col = colCount - layerIndex - 1; col > layerIndex; col--) {
            elements.push(grid[rowCount - layerIndex - 1][col]);
        }

        for (let row = rowCount - layerIndex - 1; row > layerIndex; row--) {
            elements.push(grid[row][layerIndex]);
        }

        const layerSize = elements.length;
        rotations %= layerSize;

        if (rotations === 0) return;

        let elementIndex = rotations;

        for (let col = layerIndex; col < colCount - layerIndex - 1; col++) {
            grid[layerIndex][col] = elements[elementIndex % layerSize];
            elementIndex++;
        }

        for (let row = layerIndex; row < rowCount - layerIndex - 1; row++) {
            grid[row][colCount - layerIndex - 1] = elements[elementIndex % layerSize];
            elementIndex++;
        }

        for (let col = colCount - layerIndex - 1; col > layerIndex; col--) {
            grid[rowCount - layerIndex - 1][col] = elements[elementIndex % layerSize];
            elementIndex++;
        }

        for (let row = rowCount - layerIndex - 1; row > layerIndex; row--) {
            grid[row][layerIndex] = elements[elementIndex % layerSize];
            elementIndex++;
        }
    };

    const layerCount = Math.min(rowCount, colCount) >> 1;
    for (let layer = 0; layer < layerCount; layer++) {
        rotateLayer(layer, k);
    }

    return grid;
}