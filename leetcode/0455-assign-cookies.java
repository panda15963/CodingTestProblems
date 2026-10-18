class Solution {
    public int findContentChildren(int[] g, int[] s) {
        // Sort both arrays to use greedy approach
        // g: greed factors of children
        // s: sizes of cookies
        Arrays.sort(g);
        Arrays.sort(s);
      
        int childCount = g.length;
        int cookieCount = s.length;
      
        int childIndex = 0;
        int cookieIndex = 0;
        int satisfiedChildren = 0;
      
        // Try to satisfy each child with the smallest possible cookie
        while (childIndex < childCount && cookieIndex < cookieCount) {
            // If current cookie can satisfy current child
            if (s[cookieIndex] >= g[childIndex]) {
                satisfiedChildren++;
                childIndex++;
                cookieIndex++;
            } else {
                // Current cookie is too small, try next cookie
                cookieIndex++;
            }
        }
      
        return satisfiedChildren;
    }
}
