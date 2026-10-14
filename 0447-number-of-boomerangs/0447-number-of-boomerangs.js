var numberOfBoomerangs = function(points) {
    let totalBoomerangs = 0;

    for (const [centerX, centerY] of points) {
        const distanceFrequencyMap = new Map();

        for (const [targetX, targetY] of points) {
            const squaredDistance =
                (centerX - targetX) ** 2 +
                (centerY - targetY) ** 2;

            const currentFrequency =
                distanceFrequencyMap.get(squaredDistance) || 0;

            totalBoomerangs += currentFrequency;

            distanceFrequencyMap.set(
                squaredDistance,
                currentFrequency + 1
            );
        }
    }

    return totalBoomerangs * 2;
};