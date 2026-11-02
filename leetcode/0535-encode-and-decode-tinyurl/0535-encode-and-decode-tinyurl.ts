// Base domain prefix for shortened URLs
const DOMAIN_PREFIX = "https://tinyurl.com/";

// Hash map to store the mapping from unique ID to original URL
const idToUrlMap: Map<string, string> = new Map();

// Counter to generate unique IDs for each URL
let idCounter = 0;

/**
 * Encodes a long URL to a shortened URL.
 * @param longUrl - The original URL to be shortened
 * @returns The shortened URL with format "https://tinyurl.com/{id}"
 */
function encode(longUrl: string): string {
    // Generate a unique ID by incrementing the counter
    idCounter++;
    const uniqueId = idCounter.toString();
  
    // Store the mapping from ID to original URL
    idToUrlMap.set(uniqueId, longUrl);
  
    // Return the shortened URL by concatenating domain with ID
    return DOMAIN_PREFIX + uniqueId;
}

/**
 * Decodes a shortened URL to its original URL.
 * @param shortUrl - The shortened URL to be decoded
 * @returns The original long URL
 */
function decode(shortUrl: string): string {
    // Find the position after the last '/' to extract the ID
    const idStartPos = shortUrl.lastIndexOf('/') + 1;
  
    // Extract the ID from the shortened URL
    const uniqueId = shortUrl.substring(idStartPos);
  
    // Look up and return the original URL using the ID
    return idToUrlMap.get(uniqueId) || "";
}
