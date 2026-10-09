class Solution {
    /**
     * Calculates minimum number of changes needed to make a strong password.
     * A strong password must have: length 6-20, at least one lowercase, 
     * one uppercase, one digit, and no three repeating characters in a row.
     * 
     * @param password The input password string to check
     * @return Minimum number of changes (insertions/deletions/replacements) needed
     */
    public int strongPasswordChecker(String password) {
        // Count how many character types (lowercase, uppercase, digit) are present
        int characterTypes = countTypes(password);
        int length = password.length();
      
        // Case 1: Password is too short (less than 6 characters)
        if (length < 6) {
            // Need to add characters to reach 6, and ensure we have all 3 types
            return Math.max(6 - length, 3 - characterTypes);
        }
      
        char[] passwordChars = password.toCharArray();
      
        // Case 2: Password length is valid (6-20 characters)
        if (length <= 20) {
            int replacementsNeeded = 0;
            int consecutiveCount = 0;
            char previousChar = '~'; // Initialize with a character not in password
          
            // Count replacements needed to break sequences of 3+ repeating characters
            for (char currentChar : passwordChars) {
                if (currentChar == previousChar) {
                    consecutiveCount++;
                } else {
                    // For every 3 consecutive chars, we need 1 replacement
                    replacementsNeeded += consecutiveCount / 3;
                    consecutiveCount = 1;
                    previousChar = currentChar;
                }
            }
            replacementsNeeded += consecutiveCount / 3;
          
            // Return max of replacements needed and missing character types
            return Math.max(replacementsNeeded, 3 - characterTypes);
        }
      
        // Case 3: Password is too long (more than 20 characters)
        int replacementsNeeded = 0;
        int deletionsRequired = length - 20; // Number of chars to delete
        int sequencesWithRemainder2 = 0; // Sequences where length % 3 == 1
        int consecutiveCount = 0;
        char previousChar = '~';
      
        // Process each character to find repeating sequences
        for (char currentChar : passwordChars) {
            if (currentChar == previousChar) {
                consecutiveCount++;
            } else {
                if (deletionsRequired > 0 && consecutiveCount >= 3) {
                    // If sequence length % 3 == 0, deleting 1 char saves 1 replacement
                    if (consecutiveCount % 3 == 0) {
                        deletionsRequired--;
                        replacementsNeeded--;
                    } 
                    // If sequence length % 3 == 1, track for later optimization
                    else if (consecutiveCount % 3 == 1) {
                        sequencesWithRemainder2++;
                    }
                }
                replacementsNeeded += consecutiveCount / 3;
                consecutiveCount = 1;
                previousChar = currentChar;
            }
        }
      
        // Handle the last sequence
        if (deletionsRequired > 0 && consecutiveCount >= 3) {
            if (consecutiveCount % 3 == 0) {
                deletionsRequired--;
                replacementsNeeded--;
            } else if (consecutiveCount % 3 == 1) {
                sequencesWithRemainder2++;
            }
        }
        replacementsNeeded += consecutiveCount / 3;
      
        // Optimize deletions to reduce replacements
        // Use 2 deletions on sequences with remainder 2 (length % 3 == 1)
        int use2Deletions = Math.min(Math.min(replacementsNeeded, sequencesWithRemainder2), 
                                     deletionsRequired / 2);
        replacementsNeeded -= use2Deletions;
        deletionsRequired -= use2Deletions * 2;
      
        // Use 3 deletions on remaining sequences to reduce replacements
        int use3Deletions = Math.min(replacementsNeeded, deletionsRequired / 3);
        replacementsNeeded -= use3Deletions;
        deletionsRequired -= use3Deletions * 3;
      
        // Total operations = deletions + max(remaining replacements, missing types)
        return (length - 20) + Math.max(replacementsNeeded, 3 - characterTypes);
    }
  
    /**
     * Counts the number of character types present in the string.
     * Types are: lowercase letter, uppercase letter, digit
     * 
     * @param s The input string to analyze
     * @return Number of different character types (0-3)
     */
    private int countTypes(String s) {
        int hasLowercase = 0;
        int hasUppercase = 0;
        int hasDigit = 0;
      
        // Check each character and mark which types are present
        for (char ch : s.toCharArray()) {
            if (Character.isLowerCase(ch)) {
                hasLowercase = 1;
            } else if (Character.isUpperCase(ch)) {
                hasUppercase = 1;
            } else if (Character.isDigit(ch)) {
                hasDigit = 1;
            }
        }
      
        return hasLowercase + hasUppercase + hasDigit;
    }
}
