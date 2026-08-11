var ladderLength = function (beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);

    let layer = new Set([beginWord]);
    let timeToBreak = false;
    let length = 1;

    while (layer.size > 0) {
        const newLayer = new Set();

        for (const word of layer) {
            for (let i = 0; i < beginWord.length; i++) {
                for (let code = 97; code <= 122; code++) {
                    const c = String.fromCharCode(code);

                    const newWord =
                        word.substring(0, i) +
                        c +
                        word.substring(i + 1);

                    if (wordSet.has(newWord)) {
                        if (newWord === endWord) {
                            timeToBreak = true;
                        }

                        newLayer.add(newWord);
                    }
                }
            }
        }

        length++;

        if (timeToBreak) {
            return length;
        }

        for (const word of newLayer) {
            wordSet.delete(word);
        }

        layer = newLayer;
    }

    return 0;
};