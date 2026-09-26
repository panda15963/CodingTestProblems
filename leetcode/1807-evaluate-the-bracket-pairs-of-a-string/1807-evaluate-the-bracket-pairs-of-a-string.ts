/**
 * Evaluates a string by replacing bracketed keys with their corresponding values from knowledge base
 * @param s - The input string containing text and bracketed keys to be replaced
 * @param knowledge - A 2D array where each sub-array contains [key, value] pairs
 * @returns The evaluated string with all bracketed keys replaced by their values or '?' if not found
 */
function evaluate(s: string, knowledge: string[][]): string {
    const stringLength: number = s.length;
  
    // Create a map from the knowledge array for O(1) lookup
    const knowledgeMap: Map<string, string> = new Map();
    for (const [key, value] of knowledge) {
        knowledgeMap.set(key, value);
    }
  
    // Result array to build the final string
    const result: string[] = [];
    let currentIndex: number = 0;
  
    // Process the string character by character
    while (currentIndex < stringLength) {
        if (s[currentIndex] === '(') {
            // Found opening bracket, find the corresponding closing bracket
            const closingBracketIndex: number = s.indexOf(')', currentIndex + 1);
          
            // Extract the key between brackets
            const key: string = s.slice(currentIndex + 1, closingBracketIndex);
          
            // Look up the value in the map, use '?' if not found
            result.push(knowledgeMap.get(key) ?? '?');
          
            // Move index to the closing bracket position
            currentIndex = closingBracketIndex;
        } else {
            // Regular character, add it directly to the result
            result.push(s[currentIndex]);
        }
      
        // Move to the next character
        currentIndex++;
    }
  
    // Join the result array into a single string
    return result.join('');
}
