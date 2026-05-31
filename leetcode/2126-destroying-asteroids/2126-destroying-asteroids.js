/**
 * Determines if a planet can destroy all asteroids by absorbing their mass
 * @param {number} mass - Initial mass of the planet
 * @param {number[]} asteroids - Array of asteroid masses
 * @returns {boolean} true if all asteroids can be destroyed, false otherwise
 */
function asteroidsDestroyed(mass, asteroids) {
    // Sort asteroids in ascending order
    asteroids.sort((a, b) => a - b);

    for (const asteroidMass of asteroids) {
        if (mass < asteroidMass) {
            return false;
        }
        mass += asteroidMass;
    }

    return true;
}