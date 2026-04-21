/**
 * Calculates the minimum Hamming distance between source and target arrays
 * after performing allowed swaps using Union-Find algorithm
 * @param source - The source array of integers
 * @param target - The target array of integers
 * @param allowedSwaps - Array of pairs representing indices that can be swapped
 * @returns The minimum Hamming distance achievable
 */
function minimumHammingDistance(
    source: number[],
    target: number[],
    allowedSwaps: number[][],
): number {
    const arrayLength: number = source.length;
  
    // Initialize parent array for Union-Find data structure
    // Each element initially points to itself as parent
    const parent: number[] = Array.from({ length: arrayLength }, (_, index) => index);
  
    /**
     * Find operation with path compression for Union-Find
     * Finds the root parent of a given element
     * @param element - The element to find root parent for
     * @returns The root parent of the element
     */
    const findRoot = (element: number): number => {
        // Path compression: make every node point directly to root
        if (parent[element] !== element) {
            parent[element] = findRoot(parent[element]);
        }
        return parent[element];
    };
  
    // Union operation: connect all swappable indices into connected components
    for (const [indexA, indexB] of allowedSwaps) {
        // Connect the roots of both indices
        parent[findRoot(indexA)] = findRoot(indexB);
    }
  
    // Map to store frequency of values in each connected component
    // Key: root parent, Value: Map of (value -> frequency)
    const componentValueFrequency: Map<number, Map<number, number>> = new Map();
  
    // Count frequency of source values in each connected component
    for (let i = 0; i < arrayLength; i++) {
        const rootParent = findRoot(i);
      
        // Initialize frequency map for this component if not exists
        if (!componentValueFrequency.has(rootParent)) {
            componentValueFrequency.set(rootParent, new Map());
        }
      
        const frequencyMap = componentValueFrequency.get(rootParent)!;
        // Increment frequency count for source value at index i
        frequencyMap.set(source[i], (frequencyMap.get(source[i]) ?? 0) + 1);
    }
  
    let minimumDistance = 0;
  
    // Check target values and calculate mismatches
    for (let i = 0; i < arrayLength; i++) {
        const rootParent = findRoot(i);
        const frequencyMap = componentValueFrequency.get(rootParent)!;
      
        // Decrement frequency count for target value at index i
        frequencyMap.set(target[i], (frequencyMap.get(target[i]) ?? 0) - 1);
      
        // If frequency becomes negative, it means this target value
        // doesn't have a matching source value in the same component
        if (frequencyMap.get(target[i])! < 0) {
            minimumDistance++;
        }
    }
  
    return minimumDistance;
}
