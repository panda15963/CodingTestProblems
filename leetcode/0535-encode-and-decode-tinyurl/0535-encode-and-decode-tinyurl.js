// Base domain prefix for shortened URLs
const DOMAIN_PREFIX = "https://tinyurl.com/";

// Hash map to store the mapping from unique ID to original URL
const idToUrlMap = new Map();

// Counter to generate unique IDs for each URL
let idCounter = 0;

/**
 * Encodes a long URL to a shortened URL.
 * @param {string} longUrl - The original URL to be shortened
 * @returns {string} The shortened URL
 */
function encode(longUrl) {
    idCounter++;
    const uniqueId = idCounter.toString();

    idToUrlMap.set(uniqueId, longUrl);

    return DOMAIN_PREFIX + uniqueId;
}

/**
 * Decodes a shortened URL to its original URL.
 * @param {string} shortUrl - The shortened URL to be decoded
 * @returns {string} The original long URL
 */
function decode(shortUrl) {
    const idStartPos = shortUrl.lastIndexOf('/') + 1;
    const uniqueId = shortUrl.substring(idStartPos);

    return idToUrlMap.get(uniqueId) || "";
}