var minMutation = function(startGene, endGene, bank) {
    const queue = [[startGene, 0]];
    const visited = new Set([startGene]);

    for (const [currentGene, mutationCount] of queue) {
        if (currentGene === endGene) {
            return mutationCount;
        }

        for (const nextGene of bank) {
            let allowedDifferences = 2;

            for (
                let charIndex = 0;
                charIndex < 8 && allowedDifferences > 0;
                charIndex++
            ) {
                if (currentGene[charIndex] !== nextGene[charIndex]) {
                    allowedDifferences--;
                }
            }

            if (
                allowedDifferences === 1 &&
                !visited.has(nextGene)
            ) {
                queue.push([nextGene, mutationCount + 1]);
                visited.add(nextGene);
            }
        }
    }

    return -1;
};