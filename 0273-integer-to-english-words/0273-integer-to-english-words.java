class Solution {
    // Static map to store number-to-word mappings
    private static Map<Integer, String> numberToWordMap;

    // Static block to initialize the mapping
    static {
        numberToWordMap = new HashMap<>();
      
        // Single digits (1-9)
        numberToWordMap.put(1, "One");
        numberToWordMap.put(2, "Two");
        numberToWordMap.put(3, "Three");
        numberToWordMap.put(4, "Four");
        numberToWordMap.put(5, "Five");
        numberToWordMap.put(6, "Six");
        numberToWordMap.put(7, "Seven");
        numberToWordMap.put(8, "Eight");
        numberToWordMap.put(9, "Nine");
      
        // Special cases (10-19)
        numberToWordMap.put(10, "Ten");
        numberToWordMap.put(11, "Eleven");
        numberToWordMap.put(12, "Twelve");
        numberToWordMap.put(13, "Thirteen");
        numberToWordMap.put(14, "Fourteen");
        numberToWordMap.put(15, "Fifteen");
        numberToWordMap.put(16, "Sixteen");
        numberToWordMap.put(17, "Seventeen");
        numberToWordMap.put(18, "Eighteen");
        numberToWordMap.put(19, "Nineteen");
      
        // Tens (20-90)
        numberToWordMap.put(20, "Twenty");
        numberToWordMap.put(30, "Thirty");
        numberToWordMap.put(40, "Forty");
        numberToWordMap.put(50, "Fifty");
        numberToWordMap.put(60, "Sixty");
        numberToWordMap.put(70, "Seventy");
        numberToWordMap.put(80, "Eighty");
        numberToWordMap.put(90, "Ninety");
      
        // Scale units
        numberToWordMap.put(100, "Hundred");
        numberToWordMap.put(1000, "Thousand");
        numberToWordMap.put(1000000, "Million");
        numberToWordMap.put(1000000000, "Billion");
    }

    /**
     * Converts an integer to its English words representation
     * @param num The integer to convert (0 <= num <= 2^31 - 1)
     * @return The English words representation of the number
     */
    public String numberToWords(int num) {
        // Handle special case of zero
        if (num == 0) {
            return "Zero";
        }
      
        StringBuilder result = new StringBuilder();
      
        // Process billions, millions, and thousands
        for (int scale = 1000000000; scale >= 1000; scale /= 1000) {
            if (num >= scale) {
                // Convert the group of up to 3 digits and append the scale word
                result.append(convertThreeDigits(num / scale))
                      .append(' ')
                      .append(numberToWordMap.get(scale));
                num %= scale;
            }
        }
      
        // Process remaining digits (less than 1000)
        if (num > 0) {
            result.append(convertThreeDigits(num));
        }
      
        // Remove the leading space and return
        return result.substring(1);
    }

    /**
     * Converts a number with up to 3 digits to its English words representation
     * @param num The number to convert (0 < num < 1000)
     * @return The English words representation with a leading space
     */
    private String convertThreeDigits(int num) {
        StringBuilder result = new StringBuilder();
      
        // Process hundreds place
        if (num >= 100) {
            result.append(' ')
                  .append(numberToWordMap.get(num / 100))
                  .append(' ')
                  .append(numberToWordMap.get(100));
            num %= 100;
        }
      
        // Process tens and ones places
        if (num > 0) {
            // Numbers 1-19 or multiples of 10 (20, 30, ..., 90)
            if (num < 20 || num % 10 == 0) {
                result.append(' ')
                      .append(numberToWordMap.get(num));
            } 
            // Numbers 21-99 (excluding multiples of 10)
            else {
                result.append(' ')
                      .append(numberToWordMap.get(num / 10 * 10))  // Tens place
                      .append(' ')
                      .append(numberToWordMap.get(num % 10));       // Ones place
            }
        }
      
        return result.toString();
    }
}
