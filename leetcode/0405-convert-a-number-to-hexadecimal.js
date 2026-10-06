function toHex(num) {
    if (num === 0) {
        return "0";
    }

    let hexResult = "";

    // Process 8 nibbles (4 bits each)
    for (let nibbleIndex = 7; nibbleIndex >= 0; nibbleIndex--) {
        const nibbleValue =
            (num >>> (4 * nibbleIndex)) & 0xF;

        // Skip leading zeros
        if (
            hexResult.length > 0 ||
            nibbleValue !== 0
        ) {
            let hexChar;

            if (nibbleValue < 10) {
                hexChar = String.fromCharCode(
                    nibbleValue + '0'.charCodeAt(0)
                );
            } else {
                hexChar = String.fromCharCode(
                    nibbleValue - 10 +
                    'a'.charCodeAt(0)
                );
            }

            hexResult += hexChar;
        }
    }

    return hexResult;
}