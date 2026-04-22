/**
 * Finds all queries that differ from at least one dictionary word by at most 2 characters
 * @param queries - Array of query strings to check
 * @param dictionary - Array of dictionary strings to compare against
 * @returns Array of queries that have at most 2 character differences with at least one dictionary word
 */
function twoEditWords(queries: string[], dictionary: string[]): string[] {
    // Get the length of the first query string (assuming all strings have the same length)
    const stringLength = queries[0].length;
  
    // Filter queries based on whether they have at most 2 differences with any dictionary word
    return queries.filter(queryString => {
        // Check the current query against each word in the dictionary
        for (const dictionaryWord of dictionary) {
            let differenceCount = 0;
          
            // Count character differences between query and dictionary word
            for (let charIndex = 0; charIndex < stringLength; ++charIndex) {
                if (queryString[charIndex] !== dictionaryWord[charIndex]) {
                    ++differenceCount;
                }
            }
          
            // If difference is at most 2, include this query in the result
            if (differenceCount < 3) {
                return true;
            }
        }
      
        // No dictionary word found with at most 2 differences
        return false;
    });
}