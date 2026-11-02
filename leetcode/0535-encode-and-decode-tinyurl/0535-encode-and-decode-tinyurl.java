public class Codec {
    // HashMap to store the mapping between shortened key and original URL
    private Map<String, String> urlMapping = new HashMap<>();
  
    // Counter to generate unique IDs for each URL
    private int counter = 0;
  
    // Base domain for the shortened URL
    private static final String BASE_DOMAIN = "https://tinyurl.com/";

    /**
     * Encodes a long URL to a shortened URL.
     * @param longUrl the original URL to be shortened
     * @return the shortened URL with unique identifier
     */
    public String encode(String longUrl) {
        // Generate unique ID by incrementing counter
        String uniqueId = String.valueOf(++counter);
      
        // Store the mapping of ID to original URL
        urlMapping.put(uniqueId, longUrl);
      
        // Return the complete shortened URL
        return BASE_DOMAIN + uniqueId;
    }

    /**
     * Decodes a shortened URL to its original URL.
     * @param shortUrl the shortened URL to decode
     * @return the original long URL
     */
    public String decode(String shortUrl) {
        // Find the position after the last '/' to extract the unique ID
        int lastSlashIndex = shortUrl.lastIndexOf('/') + 1;
      
        // Extract the unique ID from the shortened URL
        String uniqueId = shortUrl.substring(lastSlashIndex);
      
        // Retrieve and return the original URL using the ID
        return urlMapping.get(uniqueId);
    }
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.decode(codec.encode(url));
