/**
 * Deserializes a string representation of nested integers into a NestedInteger structure.
 * The string can represent:
 * - A single integer (e.g., "123")
 * - An empty list ("[]")
 * - A nested list (e.g., "[123,[456,789]]")
 * 
 * @param s - The serialized string to deserialize
 * @returns A NestedInteger object representing the deserialized structure
 */
function deserialize(s: string): NestedInteger {
    // Handle empty string or empty list case
    if (s === '' || s === '[]') {
        return new NestedInteger();
    }
  
    // If the string doesn't start with '[', it's a single integer
    if (s[0] !== '[') {
        return new NestedInteger(+s);
    }
  
    // Create a new NestedInteger to hold the list
    const result: NestedInteger = new NestedInteger();
  
    // Track the depth of nested brackets
    let bracketDepth: number = 0;
  
    // Iterate through the string, starting after the opening bracket
    // startIndex tracks the beginning of the current element
    for (let currentIndex = 1, startIndex = 1; currentIndex < s.length; ++currentIndex) {
        // When we're at the top level (depth 0) and encounter a comma or reach the end
        if (bracketDepth === 0 && (s[currentIndex] === ',' || currentIndex === s.length - 1)) {
            // Recursively deserialize the substring representing the current element
            result.add(deserialize(s.slice(startIndex, currentIndex)));
            // Move the start index past the comma for the next element
            startIndex = currentIndex + 1;
        } else if (s[currentIndex] === '[') {
            // Entering a nested list, increase depth
            ++bracketDepth;
        } else if (s[currentIndex] === ']') {
            // Exiting a nested list, decrease depth
            --bracketDepth;
        }
    }
  
    return result;
}
