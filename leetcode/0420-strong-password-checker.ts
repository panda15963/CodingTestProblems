/**
 * Calculates minimum number of operations to make a strong password
 * A strong password has: length 6-20, at least 1 lowercase, 1 uppercase, 1 digit,
 * and no 3+ consecutive repeating characters
 * @param password - The input password string to check
 * @returns Minimum number of operations (insertions, deletions, or replacements)
 */
function strongPasswordChecker(password: string): number {
    // Count how many character types are present (lowercase, uppercase, digit)
    const typesPresent = countTypes(password);
    const passwordLength = password.length;
  
    // Case 1: Password is too short (less than 6 characters)
    if (passwordLength < 6) {
        // Need to add characters to reach minimum length
        // Also need to ensure we have all 3 character types
        return Math.max(6 - passwordLength, 3 - typesPresent);
    }
  
    // Case 2: Password length is valid (6-20 characters)
    if (passwordLength <= 20) {
        // Count replacements needed to break sequences of 3+ repeated characters
        let replacementsNeeded = 0;
        let consecutiveCount = 0;
        let previousChar = '~';  // Placeholder for initial comparison
      
        for (const currentChar of password) {
            if (currentChar === previousChar) {
                consecutiveCount++;
            } else {
                // For every 3 consecutive characters, we need 1 replacement
                replacementsNeeded += Math.floor(consecutiveCount / 3);
                consecutiveCount = 1;
                previousChar = currentChar;
            }
        }
        replacementsNeeded += Math.floor(consecutiveCount / 3);
      
        // Return max of replacements needed and missing character types
        return Math.max(replacementsNeeded, 3 - typesPresent);
    }
  
    // Case 3: Password is too long (more than 20 characters)
    let replacementsNeeded = 0;
    let deletionsNeeded = passwordLength - 20;
    let sequencesWithRemainder2 = 0;  // Sequences where length % 3 == 1
    let consecutiveCount = 0;
    let previousChar = '~';
  
    // First pass: identify sequences and optimize deletions
    for (const currentChar of password) {
        if (currentChar === previousChar) {
            consecutiveCount++;
        } else {
            if (deletionsNeeded > 0 && consecutiveCount >= 3) {
                // Sequences divisible by 3 can be optimized with 1 deletion
                if (consecutiveCount % 3 === 0) {
                    deletionsNeeded--;
                    replacementsNeeded--;
                } else if (consecutiveCount % 3 === 1) {
                    // Track sequences with remainder 1 (need 2 deletions to optimize)
                    sequencesWithRemainder2++;
                }
            }
            replacementsNeeded += Math.floor(consecutiveCount / 3);
            consecutiveCount = 1;
            previousChar = currentChar;
        }
    }
  
    // Handle the last sequence
    if (deletionsNeeded > 0 && consecutiveCount >= 3) {
        if (consecutiveCount % 3 === 0) {
            deletionsNeeded--;
            replacementsNeeded--;
        } else if (consecutiveCount % 3 === 1) {
            sequencesWithRemainder2++;
        }
    }
    replacementsNeeded += Math.floor(consecutiveCount / 3);
  
    // Second optimization: use 2 deletions to reduce replacement count
    const deletionsUsedForRemainder2 = Math.min(
        Math.min(replacementsNeeded, sequencesWithRemainder2),
        Math.floor(deletionsNeeded / 2)
    );
    replacementsNeeded -= deletionsUsedForRemainder2;
    deletionsNeeded -= deletionsUsedForRemainder2 * 2;
  
    // Third optimization: use 3 deletions to reduce replacement count
    const deletionsUsedForRemainder0 = Math.min(
        replacementsNeeded,
        Math.floor(deletionsNeeded / 3)
    );
    replacementsNeeded -= deletionsUsedForRemainder0;
    deletionsNeeded -= deletionsUsedForRemainder0 * 3;
  
    // Total operations = deletions + max(remaining replacements, missing types)
    return (passwordLength - 20) + Math.max(replacementsNeeded, 3 - typesPresent);
}

/**
 * Helper function to count how many character types are present in the password
 * @param s - The password string to analyze
 * @returns Number of character types present (0-3)
 */
function countTypes(s: string): number {
    let hasLowercase = 0;
    let hasUppercase = 0;
    let hasDigit = 0;
  
    for (const ch of s) {
        if (ch >= 'a' && ch <= 'z') {
            hasLowercase = 1;
        } else if (ch >= 'A' && ch <= 'Z') {
            hasUppercase = 1;
        } else if (ch >= '0' && ch <= '9') {
            hasDigit = 1;
        }
    }
  
    return hasLowercase + hasUppercase + hasDigit;
}
