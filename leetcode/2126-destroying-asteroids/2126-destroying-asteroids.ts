/**
 * Determines if a planet can destroy all asteroids by absorbing their mass
 * @param mass - Initial mass of the planet
 * @param asteroids - Array of asteroid masses
 * @returns true if all asteroids can be destroyed, false otherwise
 */
function asteroidsDestroyed(mass: number, asteroids: number[]): boolean {
    // Sort asteroids in ascending order to tackle smaller ones first
    asteroids.sort((a: number, b: number) => a - b);
  
    // Iterate through each asteroid
    for (const asteroidMass of asteroids) {
        // Check if current planet mass is sufficient to destroy the asteroid
        if (mass < asteroidMass) {
            return false;
        }
        // Absorb the asteroid's mass into the planet
        mass += asteroidMass;
    }
  
    // All asteroids have been successfully destroyed
    return true;
}