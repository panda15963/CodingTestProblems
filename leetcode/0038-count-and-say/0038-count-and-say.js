/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    if (n === 1) {
        return "1";
    }

    let currentStr = "1";

    // Repeat the transformation n - 1 times
    for (let step = 0; step < n - 1; step++) {
        const nextStr = [];
        let count = 1;

        // Count consecutive digits
        for (let i = 0; i < currentStr.length; i++) {
            if (
                i + 1 === currentStr.length ||
                currentStr[i] !== currentStr[i + 1]
            ) {
                nextStr.push(String(count));
                nextStr.push(currentStr[i]);
                count = 1;
            } else {
                count++;
            }
        }

        currentStr = nextStr.join("");
    }

    return currentStr;
};