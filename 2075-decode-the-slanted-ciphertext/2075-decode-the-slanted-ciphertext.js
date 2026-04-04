var decodeCiphertext = function(encodedText, rows) {
    if (rows === 1) return encodedText;

    const n = encodedText.length;
    const cols = Math.floor(n / rows);

    let result = "";

    for (let c = 0; c < cols; c++) {
        let r = 0;
        let curC = c;

        while (r < rows && curC < cols) {
            result += encodedText[r * cols + curC];
            r++;
            curC++;
        }
    }

    return result.trimEnd();
};