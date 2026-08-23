class Solution {
    public String largestNumber(int[] nums) {
        // Convert all integers to strings for custom comparison
        List<String> numStrings = new ArrayList<>();
        for (int num : nums) {
            numStrings.add(String.valueOf(num));
        }
      
        // Sort strings based on which concatenation produces a larger number
        // For example: comparing "3" and "30" -> "330" vs "303" -> "330" is larger
        numStrings.sort((a, b) -> (b + a).compareTo(a + b));
      
        // Handle edge case: if the largest number is "0", all numbers must be 0
        if (numStrings.get(0).equals("0")) {
            return "0";
        }
      
        // Concatenate all sorted strings to form the largest number
        return String.join("", numStrings);
    }
}
