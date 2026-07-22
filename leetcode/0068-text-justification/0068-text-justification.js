/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
    const res = [];
    const line = [];

    let wordsLen = 0;

    for (const word of words) {
        const fullLen = wordsLen + line.length - 1;

        if (fullLen + word.length + 1 > maxWidth) {
            const spaces = Math.floor(
                (maxWidth - wordsLen) / Math.max(1, line.length - 1)
            );
            let remain =
                (maxWidth - wordsLen) % Math.max(1, line.length - 1);

            let lineStr = "";

            for (let j = 0; j < line.length; j++) {
                lineStr += line[j];

                if (line.length === 1) {
                    lineStr += " ".repeat(spaces);
                }

                if (j < line.length - 1) {
                    let spaceToAppend = spaces;

                    if (remain > 0) {
                        spaceToAppend++;
                        remain--;
                    }

                    lineStr += " ".repeat(spaceToAppend);
                }
            }

            res.push(lineStr);
            line.length = 0;
            wordsLen = 0;
        }

        line.push(word);
        wordsLen += word.length;
    }

    const lastLine = line.join(" ");
    const lastRowSpace = maxWidth - lastLine.length;
    res.push(lastLine + " ".repeat(lastRowSpace));

    return res;
};