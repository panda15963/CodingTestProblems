class Solution {
    public int hIndex(int[] citations) {
        // Sort the citations array in ascending order
        Arrays.sort(citations);
      
        // Get the total number of papers
        int n = citations.length;
      
        // Try each possible h-index value from highest to lowest
        for (int h = n; h > 0; h--) {
            // Check if we have at least h papers with h or more citations
            // citations[n - h] is the h-th paper from the end (after sorting)
            // If this paper has at least h citations, then all papers after it
            // (which are h papers total) also have at least h citations
            if (citations[n - h] >= h) {
                return h;
            }
        }
      
        // If no valid h-index found, return 0
        return 0;
    }
}
