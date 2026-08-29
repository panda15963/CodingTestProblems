class Solution {
    public boolean isIsomorphic(String s, String t) {
        // Map to store character mappings from string s to string t
        Map<Character, Character> sToTMap = new HashMap<>();
        // Map to store character mappings from string t to string s
        Map<Character, Character> tToSMap = new HashMap<>();
      
        int length = s.length();
      
        // Iterate through both strings simultaneously
        for (int i = 0; i < length; i++) {
            char charFromS = s.charAt(i);
            char charFromT = t.charAt(i);
          
            // Check if charFromS already has a mapping
            // If it exists and maps to a different character, strings are not isomorphic
            if (sToTMap.containsKey(charFromS) && sToTMap.get(charFromS) != charFromT) {
                return false;
            }
          
            // Check if charFromT already has a mapping
            // If it exists and maps to a different character, strings are not isomorphic
            if (tToSMap.containsKey(charFromT) && tToSMap.get(charFromT) != charFromS) {
                return false;
            }
          
            // Create or update the bidirectional mapping
            sToTMap.put(charFromS, charFromT);
            tToSMap.put(charFromT, charFromS);
        }
      
        // All characters satisfy the isomorphic property
        return true;
    }
}
