/**
 * Calculate the number of different ways to reorder nums to get the same BST
 * @param nums - Array of distinct integers representing BST insertion order
 * @returns Number of reorderings that produce the same BST (excluding original)
 */
function numOfWays(nums: number[]): number {
    const arrayLength: number = nums.length;
    const MOD: number = 1e9 + 7;
  
    // Build Pascal's triangle for combination calculations
    // combinationTable[n][k] represents C(n, k) = n! / (k! * (n-k)!)
    const combinationTable: number[][] = new Array(arrayLength)
        .fill(0)
        .map(() => new Array(arrayLength).fill(0));
  
    // Initialize Pascal's triangle
    combinationTable[0][0] = 1;
    for (let row = 1; row < arrayLength; ++row) {
        combinationTable[row][0] = 1; // C(n, 0) = 1
        for (let col = 1; col <= row; ++col) {
            // C(n, k) = C(n-1, k-1) + C(n-1, k)
            combinationTable[row][col] = (combinationTable[row - 1][col - 1] + 
                                         combinationTable[row - 1][col]) % MOD;
        }
    }
  
    /**
     * Recursively calculate number of valid BST arrangements
     * @param currentNums - Current array segment to process
     * @returns Number of valid arrangements for this subtree
     */
    const calculateArrangements = (currentNums: number[]): number => {
        // Base case: empty or single element has only one arrangement
        if (currentNums.length < 2) {
            return 1;
        }
      
        // Split array into left and right subtrees based on root (first element)
        const leftSubtree: number[] = [];
        const rightSubtree: number[] = [];
        const rootValue: number = currentNums[0];
      
        for (let i = 1; i < currentNums.length; ++i) {
            if (currentNums[i] < rootValue) {
                leftSubtree.push(currentNums[i]);
            } else {
                rightSubtree.push(currentNums[i]);
            }
        }
      
        // Get sizes and calculate arrangements for subtrees
        const leftSize: number = leftSubtree.length;
        const rightSize: number = rightSubtree.length;
        const leftArrangements: number = calculateArrangements(leftSubtree);
        const rightArrangements: number = calculateArrangements(rightSubtree);
      
        // Calculate total arrangements using combination formula
        // We choose leftSize positions from (leftSize + rightSize) for left subtree elements
        // The remaining positions go to right subtree elements
        const combinations: bigint = BigInt(combinationTable[leftSize + rightSize][leftSize]);
        const leftArrangementsBig: bigint = BigInt(leftArrangements);
        const rightArrangementsBig: bigint = BigInt(rightArrangements);
      
        return Number((combinations * leftArrangementsBig * rightArrangementsBig) % BigInt(MOD));
    };
  
    // Calculate total arrangements and subtract 1 for the original arrangement
    return (calculateArrangements(nums) - 1 + MOD) % MOD;
}
