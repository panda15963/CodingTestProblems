/**
 * Calculates the minimum Hamming distance between source and target arrays
 * after performing allowed swaps using Union-Find algorithm
 * @param {number[]} source - The source array of integers
 * @param {number[]} target - The target array of integers
 * @param {number[][]} allowedSwaps - Array of pairs representing indices that can be swapped
 * @returns {number} The minimum Hamming distance achievable
 */
function minimumHammingDistance(source, target, allowedSwaps) {
    const arrayLength = source.length;
  
    // Initialize parent array for Union-Find data structure
    const parent = Array.from({ length: arrayLength }, (_, index) => index);
  
    // Find operation with path compression
    const findRoot = (element) => {
        if (parent[element] !== element) {
            parent[element] = findRoot(parent[element]);
        }
        return parent[element];
    };
  
    // Union operation: connect all swappable indices
    for (const [indexA, indexB] of allowedSwaps) {
        parent[findRoot(indexA)] = findRoot(indexB);
    }
  
    // Map to store frequency of values in each connected component
    const componentValueFrequency = new Map();
  
    // Count frequency of source values in each connected component
    for (let i = 0; i < arrayLength; i++) {
        const rootParent = findRoot(i);
      
        if (!componentValueFrequency.has(rootParent)) {
            componentValueFrequency.set(rootParent, new Map());
        }
      
        const frequencyMap = componentValueFrequency.get(rootParent);
        frequencyMap.set(source[i], (frequencyMap.get(source[i]) ?? 0) + 1);
    }
  
    let minimumDistance = 0;
  
    // Check target values and calculate mismatches
    for (let i = 0; i < arrayLength; i++) {
        const rootParent = findRoot(i);
        const frequencyMap = componentValueFrequency.get(rootParent);
      
        frequencyMap.set(target[i], (frequencyMap.get(target[i]) ?? 0) - 1);
      
        if (frequencyMap.get(target[i]) < 0) {
            minimumDistance++;
        }
    }
  
    return minimumDistance;
}