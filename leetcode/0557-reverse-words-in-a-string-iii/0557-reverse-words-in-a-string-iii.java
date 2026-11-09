class Solution {
    /**
     * Reverses each word in a string while maintaining the word order and spaces.
     * For example: "Let's take LeetCode" becomes "s'teL ekat edoCteeL"
     * 
     * @param s The input string containing words separated by single spaces
     * @return A string with each word reversed but maintaining original word positions
     */
    public String reverseWords(String s) {
        // Split the input string into an array of words using space as delimiter
        String[] words = s.split(" ");
      
        // Iterate through each word in the array
        for (int i = 0; i < words.length; i++) {
            // Reverse the current word using StringBuilder's reverse method
            // and update it in the array
            words[i] = new StringBuilder(words[i]).reverse().toString();
        }
      
        // Join all reversed words back together with single spaces
        return String.join(" ", words);
    }
}
